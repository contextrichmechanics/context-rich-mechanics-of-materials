import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "data", "problem-catalog.json");

function argValue(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function usage() {
  console.log(`Usage:
node scripts/render-assignment.mjs --problem <slug-or-id> [--variant <id>] [--type student|instructor] [--format html|doc|qmd|docx|pdf]

Examples:
node scripts/render-assignment.mjs --problem jib-crane-battery-pack --variant section-a --type student --format html
node scripts/render-assignment.mjs --problem bolted-bracket-lift-arm --variant heavy-load --type instructor --format docx`);
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function symbolHtml(symbol) {
  const parts = String(symbol || "").split("_");
  const greek = {
    alpha: "&alpha;",
    beta: "&beta;",
    gamma: "&gamma;",
    theta: "&theta;",
    sigma: "&sigma;",
    tau: "&tau;",
    delta: "&delta;",
    pi: "&pi;"
  };
  const base = greek[parts[0]] || escapeHtml(parts[0]);
  if (parts.length === 1) {
    return base;
  }
  return `${base}<sub>${escapeHtml(parts.slice(1).join(","))}</sub>`;
}

function unitHtml(unit) {
  const normalized = String(unit || "").trim();
  if (!normalized || normalized === "-") {
    return "";
  }
  return escapeHtml(normalized).replace(/\^(-?\d+)/g, "<sup>$1</sup>");
}

function valueWithUnitHtml(value, unit) {
  const renderedUnit = unitHtml(unit);
  return `${escapeHtml(value)}${renderedUnit ? ` ${renderedUnit}` : ""}`;
}

function decodeEntities(value) {
  return String(value)
    .replace(/&alpha;/g, "α")
    .replace(/&beta;/g, "β")
    .replace(/&gamma;/g, "γ")
    .replace(/&theta;/g, "θ")
    .replace(/&sigma;/g, "σ")
    .replace(/&tau;/g, "τ")
    .replace(/&delta;/g, "δ")
    .replace(/&pi;/g, "π")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function htmlToMarkdown(value) {
  return decodeEntities(value)
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p>/gi, "\n\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<strong>/gi, "**")
    .replace(/<\/strong>/gi, "**")
    .replace(/<em>/gi, "*")
    .replace(/<\/em>/gi, "*")
    .replace(/<sub>(.*?)<\/sub>/gis, "~$1~")
    .replace(/<sup>(.*?)<\/sup>/gis, "^$1^")
    .replace(/<ul>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ol>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li>/gi, "\n- ")
    .replace(/<\/li>/gi, "")
    .replace(/<h[1-6][^>]*>/gi, "\n\n**")
    .replace(/<\/h[1-6]>/gi, "**\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tableCell(value) {
  return htmlToMarkdown(value).replace(/\|/g, "\\|").replace(/\n+/g, " ");
}

function numericValue(values, key) {
  const value = Number(values[key]);
  return Number.isFinite(value) ? value : null;
}

function formatDerived(value, digits = 0) {
  if (!Number.isFinite(value)) {
    return "";
  }
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  });
}

function variableMap(problem, currentValues) {
  const values = {};
  problem.variables.forEach((variable) => {
    values[variable.key] = currentValues[variable.key] ?? variable.value;
    values[`${variable.key}_unit`] = variable.unit;
    values[`${variable.key}_label`] = variable.label;
  });
  const mass = Number(values.M);
  if (Number.isFinite(mass)) {
    values.weight_N = Math.round(mass * 9.81).toLocaleString();
  }

  const L = numericValue(values, "L");
  const Lb = numericValue(values, "Lb");
  const thetaDeg = numericValue(values, "theta");
  const gammaD = numericValue(values, "gamma_d");
  const sectionModulus = numericValue(values, "S_boom");
  const inertia = numericValue(values, "I_boom");
  const modulus = numericValue(values, "E");
  const braceArea = numericValue(values, "A_brace");
  const pinDiameter = numericValue(values, "d_pin");
  const plateThickness = numericValue(values, "t_plate");
  const yieldStrength = numericValue(values, "sigma_y");
  const horizontalLoad = numericValue(values, "H") || 0;
  const horizontalOffset = numericValue(values, "e_H") || 0;
  const yieldFactor = numericValue(values, "N_y");
  const allowableDeflection = numericValue(values, "delta_allow");
  const braceK = numericValue(values, "K_brace");
  const braceRadius = numericValue(values, "r_min");
  const braceInertia = numericValue(values, "I_brace");
  const bucklingFactor = numericValue(values, "N_b");
  const shearPlanes = numericValue(values, "n_s") || 1;
  const allowableShear = numericValue(values, "tau_allow");
  const allowableBearing = numericValue(values, "bearing_allow");
  if (Number.isFinite(yieldStrength) && Number.isFinite(yieldFactor) && yieldFactor > 0) {
    values.yield_allow_MPa = formatDerived(yieldStrength / yieldFactor, 1);
  }

  if (Number.isFinite(mass) && Number.isFinite(gammaD)) {
    const designLoad = gammaD * mass * 9.81;
    values.P_design_N = formatDerived(designLoad);

    if (Number.isFinite(L)) {
      const wallMoment = designLoad * L;
      const horizontalMoment = horizontalLoad * horizontalOffset;
      const governingMoment = wallMoment + horizontalMoment;
      values.wall_moment_Nm = formatDerived(wallMoment);
      values.horizontal_moment_Nm = formatDerived(horizontalMoment);
      values.governing_support_moment_Nm = formatDerived(governingMoment);

      if (Number.isFinite(sectionModulus) && sectionModulus > 0) {
        const boomBending = wallMoment * 1000 / sectionModulus;
        values.boom_bending_MPa = formatDerived(boomBending, 1);
        if (Number.isFinite(yieldStrength) && boomBending > 0) {
          values.boom_yield_margin = formatDerived(yieldStrength / boomBending, 2);
        }
      }

      if (Number.isFinite(modulus) && Number.isFinite(inertia) && modulus > 0 && inertia > 0) {
        const Lmm = L * 1000;
        const tipDeflection = designLoad * Lmm ** 3 / (3 * modulus * inertia);
        values.tip_deflection_mm = formatDerived(tipDeflection, 1);
        if (Number.isFinite(allowableDeflection) && allowableDeflection > 0) {
          values.deflection_utilization = formatDerived(tipDeflection / allowableDeflection, 2);
        }
      }
    }

    if (Number.isFinite(L) && Number.isFinite(Lb) && Lb > 0 && Number.isFinite(thetaDeg)) {
      const thetaRad = thetaDeg * Math.PI / 180;
      const sinTheta = Math.sin(thetaRad);
      const cosTheta = Math.cos(thetaRad);
      if (sinTheta > 0 && cosTheta > 0) {
        const wallMoment = designLoad * L;
        const horizontalMoment = horizontalLoad * horizontalOffset;
        const governingMoment = wallMoment + horizontalMoment;
        const braceVertical = governingMoment / Lb;
        const braceForce = braceVertical / sinTheta;
        const braceHorizontal = braceForce * cosTheta;
        const wallPinReactionX = -(braceHorizontal + horizontalLoad);
        const wallPinReactionY = designLoad - braceVertical;
        const braceLength = Lb / cosTheta;
        const bracedBoomMoment = Math.abs(governingMoment - designLoad * Lb);
        values.brace_vertical_N = formatDerived(braceVertical);
        values.brace_force_N = formatDerived(braceForce);
        values.brace_horizontal_N = formatDerived(braceHorizontal);
        values.wall_pin_reaction_x_N = formatDerived(wallPinReactionX);
        values.wall_pin_reaction_y_N = formatDerived(wallPinReactionY);
        values.brace_length_m = formatDerived(braceLength, 2);
        values.braced_boom_moment_Nm = formatDerived(bracedBoomMoment);

        const utilizations = [];

        if (Number.isFinite(sectionModulus) && sectionModulus > 0) {
          const bracedBoomBending = bracedBoomMoment * 1000 / sectionModulus;
          values.braced_boom_bending_MPa = formatDerived(bracedBoomBending, 1);
          if (Number.isFinite(yieldStrength) && Number.isFinite(yieldFactor) && yieldFactor > 0) {
            const boomUtilization = bracedBoomBending / (yieldStrength / yieldFactor);
            values.boom_stress_utilization = formatDerived(boomUtilization, 2);
            utilizations.push(["boom bending stress", boomUtilization]);
          }
        }

        if (Number.isFinite(braceArea) && braceArea > 0) {
          const braceStress = braceForce / braceArea;
          values.brace_stress_MPa = formatDerived(braceStress, 1);
          if (Number.isFinite(yieldStrength) && braceStress > 0) {
            values.brace_yield_margin = formatDerived(yieldStrength / braceStress, 2);
          }
          if (Number.isFinite(yieldStrength) && Number.isFinite(yieldFactor) && yieldFactor > 0) {
            const braceYieldUtilization = braceStress / (yieldStrength / yieldFactor);
            values.brace_yield_utilization = formatDerived(braceYieldUtilization, 2);
            utilizations.push(["brace axial yielding", braceYieldUtilization]);
          }
        }

        if (Number.isFinite(modulus) && Number.isFinite(braceInertia) && Number.isFinite(braceK) && braceK > 0) {
          const braceLengthMm = braceLength * 1000;
          const braceBuckling = Math.PI ** 2 * modulus * braceInertia / (braceK * braceLengthMm) ** 2;
          values.brace_buckling_N = formatDerived(braceBuckling);
          if (Number.isFinite(bucklingFactor) && bucklingFactor > 0) {
            const braceBucklingAllowable = braceBuckling / bucklingFactor;
            const braceBucklingUtilization = braceForce / braceBucklingAllowable;
            values.brace_buckling_allow_N = formatDerived(braceBucklingAllowable);
            values.brace_buckling_utilization = formatDerived(braceBucklingUtilization, 2);
            utilizations.push(["brace buckling", braceBucklingUtilization]);
          }
        }

        if (Number.isFinite(braceK) && Number.isFinite(braceRadius) && braceRadius > 0) {
          values.brace_slenderness = formatDerived(braceK * braceLength * 1000 / braceRadius, 1);
        }

        if (Number.isFinite(pinDiameter) && pinDiameter > 0) {
          const pinArea = Math.PI * pinDiameter ** 2 / 4;
          const pinShear = braceForce / (shearPlanes * pinArea);
          values.pin_area_mm2 = formatDerived(pinArea, 1);
          values.pin_shear_MPa = formatDerived(pinShear, 1);
          if (Number.isFinite(allowableShear) && allowableShear > 0) {
            const pinUtilization = pinShear / allowableShear;
            values.pin_shear_utilization = formatDerived(pinUtilization, 2);
            utilizations.push(["pin shear", pinUtilization]);
          }
          if (Number.isFinite(plateThickness) && plateThickness > 0) {
            const bearing = braceForce / (plateThickness * pinDiameter);
            values.bearing_MPa = formatDerived(bearing, 1);
            if (Number.isFinite(allowableBearing) && allowableBearing > 0) {
              const bearingUtilization = bearing / allowableBearing;
              values.bearing_utilization = formatDerived(bearingUtilization, 2);
              utilizations.push(["plate bearing", bearingUtilization]);
            }
          }
        }

        const deflectionUtilization = Number(String(values.deflection_utilization || "").replace(/,/g, ""));
        if (Number.isFinite(deflectionUtilization)) {
          utilizations.push(["cantilever comparison deflection", deflectionUtilization]);
        }
        const governing = utilizations
          .filter(([, value]) => Number.isFinite(value))
          .sort((a, b) => b[1] - a[1])[0];
        if (governing) {
          values.governing_mode = governing[0];
          values.governing_utilization = formatDerived(governing[1], 2);
          values.design_recommendation = governing[1] <= 1 ? "accepted for detailed design with additional verification" : "requires modification";
        }
      }
    }
  }
  const ladderDistributedLoad = numericValue(values, "w");
  const ladderBraceLength = numericValue(values, "Ld");
  const ladderArmSection = numericValue(values, "S_a");
  const ladderBraceArea = numericValue(values, "A_d");
  const ladderBraceInertia = numericValue(values, "I_d");
  const ladderBraceRadius = numericValue(values, "r_min");
  const ladderK = numericValue(values, "K");
  const ladderPinDiameter = numericValue(values, "d_p");
  const ladderPlateThickness = numericValue(values, "t");
  const ladderShearPlanes = numericValue(values, "n_s") || 1;

  if (
    Number.isFinite(L) &&
    Number.isFinite(ladderDistributedLoad) &&
    Number.isFinite(ladderBraceLength) &&
    Number.isFinite(thetaDeg)
  ) {
    const thetaRad = thetaDeg * Math.PI / 180;
    const sinTheta = Math.sin(thetaRad);
    const cosTheta = Math.cos(thetaRad);
    if (sinTheta > 0 && cosTheta > 0) {
      const a = ladderBraceLength * cosTheta;
      const projectedHeight = ladderBraceLength * sinTheta;
      const resultant = ladderDistributedLoad * L;
      const braceVertical = ladderDistributedLoad * L ** 2 / (2 * a);
      const braceForce = braceVertical / sinTheta;
      const braceHorizontal = braceForce * cosTheta;
      const upperReactionX = -braceHorizontal;
      const upperReactionY = resultant - braceVertical;
      values.ladder_a_m = formatDerived(a, 3);
      values.ladder_H_projected_m = formatDerived(projectedHeight, 3);
      values.ladder_load_resultant_N = formatDerived(resultant);
      values.ladder_brace_vertical_N = formatDerived(braceVertical);
      values.ladder_brace_force_N = formatDerived(braceForce);
      values.ladder_brace_horizontal_N = formatDerived(braceHorizontal);
      values.ladder_upper_reaction_x_N = formatDerived(upperReactionX);
      values.ladder_upper_reaction_y_N = formatDerived(upperReactionY);

      const momentAtA = upperReactionY * a - ladderDistributedLoad * a ** 2 / 2;
      const xCritical = upperReactionY / ladderDistributedLoad;
      const candidates = [
        [0, 0],
        [a, momentAtA],
        [L, 0]
      ];
      if (xCritical > 0 && xCritical < a) {
        candidates.push([xCritical, upperReactionY * xCritical - ladderDistributedLoad * xCritical ** 2 / 2]);
      }
      const [maxMomentLocation, maxMoment] = candidates
        .map(([x, moment]) => [x, Math.abs(moment)])
        .sort((left, right) => right[1] - left[1])[0];
      values.ladder_Mmax_Nm = formatDerived(maxMoment, 1);
      values.ladder_Mmax_location_m = formatDerived(maxMomentLocation, 3);

      const utilizations = [];
      if (Number.isFinite(yieldStrength) && Number.isFinite(yieldFactor) && yieldFactor > 0) {
        const yieldAllow = yieldStrength / yieldFactor;
        values.ladder_yield_allow_MPa = formatDerived(yieldAllow, 1);

        if (Number.isFinite(ladderArmSection) && ladderArmSection > 0) {
          const bendingStress = maxMoment * 1000 / ladderArmSection;
          const armUtilization = bendingStress / yieldAllow;
          values.ladder_bending_MPa = formatDerived(bendingStress, 1);
          values.ladder_arm_stress_utilization = formatDerived(armUtilization, 2);
          utilizations.push(["horizontal-arm bending stress", armUtilization]);
        }

        if (Number.isFinite(ladderBraceArea) && ladderBraceArea > 0) {
          const braceStress = braceForce / ladderBraceArea;
          const braceYieldUtilization = braceStress / yieldAllow;
          values.ladder_brace_stress_MPa = formatDerived(braceStress, 1);
          values.ladder_brace_yield_utilization = formatDerived(braceYieldUtilization, 2);
          utilizations.push(["brace axial yielding", braceYieldUtilization]);
        }
      }

      if (Number.isFinite(ladderK) && Number.isFinite(ladderBraceRadius) && ladderBraceRadius > 0) {
        values.ladder_brace_slenderness = formatDerived(ladderK * ladderBraceLength * 1000 / ladderBraceRadius, 1);
      }
      if (
        Number.isFinite(modulus) &&
        Number.isFinite(ladderBraceInertia) &&
        Number.isFinite(ladderK) &&
        ladderK > 0
      ) {
        const braceBuckling = Math.PI ** 2 * modulus * ladderBraceInertia / (ladderK * ladderBraceLength * 1000) ** 2;
        values.ladder_brace_buckling_N = formatDerived(braceBuckling);
        if (Number.isFinite(bucklingFactor) && bucklingFactor > 0) {
          const braceBucklingAllow = braceBuckling / bucklingFactor;
          const braceBucklingUtilization = braceForce / braceBucklingAllow;
          values.ladder_brace_buckling_allow_N = formatDerived(braceBucklingAllow);
          values.ladder_brace_buckling_utilization = formatDerived(braceBucklingUtilization, 2);
          utilizations.push(["brace buckling", braceBucklingUtilization]);
        }
      }

      if (Number.isFinite(ladderPinDiameter) && ladderPinDiameter > 0) {
        const pinArea = Math.PI * ladderPinDiameter ** 2 / 4;
        const pinShear = braceForce / (ladderShearPlanes * pinArea);
        values.ladder_pin_area_mm2 = formatDerived(pinArea, 1);
        values.ladder_pin_shear_MPa = formatDerived(pinShear, 1);
        if (Number.isFinite(allowableShear) && allowableShear > 0) {
          const pinUtilization = pinShear / allowableShear;
          values.ladder_pin_shear_utilization = formatDerived(pinUtilization, 2);
          utilizations.push(["pin shear", pinUtilization]);
        }

        if (Number.isFinite(ladderPlateThickness) && ladderPlateThickness > 0) {
          const bearingStress = braceForce / (ladderPlateThickness * ladderPinDiameter);
          values.ladder_bearing_MPa = formatDerived(bearingStress, 1);
          if (Number.isFinite(allowableBearing) && allowableBearing > 0) {
            const bearingUtilization = bearingStress / allowableBearing;
            values.ladder_bearing_utilization = formatDerived(bearingUtilization, 2);
            utilizations.push(["plate bearing", bearingUtilization]);
          }
        }
      }

      const governing = utilizations
        .filter(([, value]) => Number.isFinite(value))
        .sort((left, right) => right[1] - left[1])[0];
      if (governing) {
        values.ladder_governing_mode = governing[0];
        values.ladder_governing_utilization = formatDerived(governing[1], 2);
        values.ladder_design_recommendation = governing[1] <= 1
          ? "passes the preliminary bracket checks, pending full-system verification"
          : "requires modification before detailed design";
      }
    }
  }

  const bikeLoad = numericValue(values, "P");
  const bikeXab = numericValue(values, "x_AB");
  const bikeXbc = numericValue(values, "x_BC");
  const bikeYbc = numericValue(values, "y_BC");
  const bikeThetaDeg = numericValue(values, "theta_BD");
  const bikeTauFail = numericValue(values, "tau_fail");
  const bikeDiameterB = numericValue(values, "d_B");
  const bikeDiameterC = numericValue(values, "d_C");
  const bikeShearPlanes = numericValue(values, "n_s") || 2;

  if (
    Number.isFinite(bikeLoad) &&
    Number.isFinite(bikeXab) &&
    Number.isFinite(bikeXbc) &&
    Number.isFinite(bikeYbc) &&
    Number.isFinite(bikeThetaDeg)
  ) {
    const thetaRad = bikeThetaDeg * Math.PI / 180;
    const sinTheta = Math.sin(thetaRad);
    const cosTheta = Math.cos(thetaRad);
    const totalArm = bikeXab + bikeXbc;
    const bMomentArm = bikeXbc * sinTheta + bikeYbc * cosTheta;
    if (bMomentArm > 0) {
      const linkForce = bikeLoad * totalArm / bMomentArm;
      const forceBx = -linkForce * cosTheta;
      const forceBy = linkForce * sinTheta;
      const reactionCx = -forceBx;
      const reactionCy = bikeLoad - forceBy;
      const reactionC = Math.hypot(reactionCx, reactionCy);
      values.bike_total_arm_mm = formatDerived(totalArm, 1);
      values.bike_B_moment_arm_mm = formatDerived(bMomentArm, 2);
      values.bike_link_force_N = formatDerived(linkForce);
      values.bike_B_force_x_N = formatDerived(forceBx);
      values.bike_B_force_y_N = formatDerived(forceBy);
      values.bike_C_reaction_x_N = formatDerived(reactionCx);
      values.bike_C_reaction_y_N = formatDerived(reactionCy);
      values.bike_C_reaction_N = formatDerived(reactionC);

      if (Number.isFinite(bikeDiameterB) && bikeDiameterB > 0 && Number.isFinite(bikeDiameterC) && bikeDiameterC > 0) {
        const areaB = Math.PI * bikeDiameterB ** 2 / 4;
        const areaC = Math.PI * bikeDiameterC ** 2 / 4;
        const doubleAreaB = bikeShearPlanes * areaB;
        const doubleAreaC = bikeShearPlanes * areaC;
        const shearB = linkForce / doubleAreaB;
        const shearC = reactionC / doubleAreaC;
        values.bike_pin_B_area_mm2 = formatDerived(areaB, 2);
        values.bike_pin_C_area_mm2 = formatDerived(areaC, 2);
        values.bike_pin_B_double_area_mm2 = formatDerived(doubleAreaB, 2);
        values.bike_pin_C_double_area_mm2 = formatDerived(doubleAreaC, 2);
        values.bike_pin_B_shear_MPa = formatDerived(shearB, 2);
        values.bike_pin_C_shear_MPa = formatDerived(shearC, 2);

        if (Number.isFinite(bikeTauFail) && bikeTauFail > 0) {
          const fosB = bikeTauFail / shearB;
          const fosC = bikeTauFail / shearC;
          const governingPin = fosB <= fosC ? "B" : "C";
          const governingFos = Math.min(fosB, fosC);
          values.bike_pin_B_fos = formatDerived(fosB, 2);
          values.bike_pin_C_fos = formatDerived(fosC, 2);
          values.bike_governing_pin = governingPin;
          values.bike_governing_fos = formatDerived(governingFos, 2);
          values.bike_recommendation = governingFos > 1
            ? `both pins have FOS greater than 1 for the specified static shear failure stress, with pin ${governingPin} governing`
            : `pin ${governingPin} does not meet FOS greater than 1 for the specified static shear failure stress`;
        }
      }
    }
  }

  const wheelLoad = numericValue(values, "P");
  const wheelRadius = numericValue(values, "r");
  const wheelModulus = numericValue(values, "E");
  const wheelArea = numericValue(values, "A_s");

  if (Number.isFinite(wheelLoad)) {
    const forceB = 2 * wheelLoad / 3;
    const forceC = -wheelLoad / 3;
    const forceD = forceC;
    values.wheel_force_B_kN = formatDerived(forceB, 2);
    values.wheel_force_C_kN = formatDerived(forceC, 2);
    values.wheel_force_D_kN = formatDerived(forceD, 2);
    values.wheel_force_B_abs_kN = formatDerived(Math.abs(forceB), 2);
    values.wheel_force_C_abs_kN = formatDerived(Math.abs(forceC), 2);
    values.wheel_force_D_abs_kN = formatDerived(Math.abs(forceD), 2);
    values.wheel_governing_spoke = "AB";
    values.wheel_governing_force_kN = formatDerived(Math.abs(forceB), 2);

    if (Number.isFinite(wheelArea) && wheelArea > 0) {
      values.wheel_stress_B_MPa = formatDerived(forceB * 1000 / wheelArea, 2);
      values.wheel_stress_C_MPa = formatDerived(forceC * 1000 / wheelArea, 2);
      values.wheel_stress_D_MPa = formatDerived(forceD * 1000 / wheelArea, 2);
    }

    if (
      Number.isFinite(wheelRadius) &&
      Number.isFinite(wheelModulus) &&
      Number.isFinite(wheelArea) &&
      wheelModulus > 0 &&
      wheelArea > 0
    ) {
      const displacement = (2 * wheelLoad * 1000 * wheelRadius * 1000) / (3 * wheelModulus * wheelArea);
      values.wheel_hub_displacement_mm = formatDerived(displacement, 3);
    }
  }

  const pressLoad = numericValue(values, "P");
  const pressDiameter = numericValue(values, "d");
  const pressThickness = numericValue(values, "t");
  const pressShearAllowable = numericValue(values, "tau_allow");
  const pressBearingAllowable = numericValue(values, "sigma_bearing_allow");

  if (
    Number.isFinite(pressLoad) &&
    Number.isFinite(pressDiameter) &&
    pressDiameter > 0 &&
    Number.isFinite(pressThickness) &&
    pressThickness > 0
  ) {
    const loadN = pressLoad * 1000;
    const bearingArea = Math.PI * pressDiameter ** 2 / 4;
    const punchingArea = 2 * pressDiameter * pressThickness;
    const bearingStress = loadN / bearingArea;
    const punchingStress = loadN / punchingArea;
    values.press_load_N = formatDerived(loadN);
    values.press_bearing_area_mm2 = formatDerived(bearingArea, 1);
    values.press_punching_area_mm2 = formatDerived(punchingArea, 1);
    values.press_bearing_stress_MPa = formatDerived(bearingStress, 2);
    values.press_punching_shear_MPa = formatDerived(punchingStress, 2);
    if (punchingStress >= bearingStress) {
      values.press_larger_stress = "average punching shear stress";
      values.press_larger_stress_MPa = formatDerived(punchingStress, 2);
    } else {
      values.press_larger_stress = "average bearing stress";
      values.press_larger_stress_MPa = formatDerived(bearingStress, 2);
    }

    const fosValues = [];
    if (Number.isFinite(pressShearAllowable) && pressShearAllowable > 0) {
      const fosShear = pressShearAllowable / punchingStress;
      values.press_fos_shear = formatDerived(fosShear, 2);
      fosValues.push(["punching shear", fosShear]);
    }
    if (Number.isFinite(pressBearingAllowable) && pressBearingAllowable > 0) {
      const fosBearing = pressBearingAllowable / bearingStress;
      values.press_fos_bearing = formatDerived(fosBearing, 2);
      fosValues.push(["bearing", fosBearing]);
    }
    const governingFos = fosValues.sort((left, right) => left[1] - right[1])[0];
    if (governingFos) {
      values.press_governing_fos_mode = governingFos[0];
      values.press_governing_fos = formatDerived(governingFos[1], 2);
    }
  }

  const clevisLoad = numericValue(values, "P");
  const clevisD1 = numericValue(values, "d_1");
  const clevisD2 = numericValue(values, "d_2");
  const clevisDA = numericValue(values, "d_A");
  const clevisShearPlanes = numericValue(values, "n_s") || 2;
  const clevisNormalAllowable = numericValue(values, "sigma_allow");
  const clevisShearAllowable = numericValue(values, "tau_allow");

  if (
    Number.isFinite(clevisLoad) &&
    Number.isFinite(clevisD1) &&
    clevisD1 > 0 &&
    Number.isFinite(clevisD2) &&
    clevisD2 > 0 &&
    Number.isFinite(clevisDA) &&
    clevisDA > 0 &&
    Number.isFinite(clevisShearPlanes) &&
    clevisShearPlanes > 0
  ) {
    const loadN = clevisLoad * 1000;
    const area1 = Math.PI * clevisD1 ** 2 / 4;
    const area2 = Math.PI * clevisD2 ** 2 / 4;
    const pinArea = Math.PI * clevisDA ** 2 / 4;
    const totalPinShearArea = clevisShearPlanes * pinArea;
    const shearPlaneLoad = loadN / clevisShearPlanes;
    const sigma1 = loadN / area1;
    const sigma2 = loadN / area2;
    const tauA = loadN / totalPinShearArea;
    values.clevis_load_N = formatDerived(loadN);
    values.clevis_shear_plane_load_N = formatDerived(shearPlaneLoad);
    values.clevis_area_1_mm2 = formatDerived(area1, 1);
    values.clevis_area_2_mm2 = formatDerived(area2, 1);
    values.clevis_pin_area_mm2 = formatDerived(pinArea, 1);
    values.clevis_pin_total_shear_area_mm2 = formatDerived(totalPinShearArea, 1);
    values.clevis_sigma_1_MPa = formatDerived(sigma1, 2);
    values.clevis_sigma_2_MPa = formatDerived(sigma2, 2);
    values.clevis_tau_A_MPa = formatDerived(tauA, 2);

    const largestStress = [
      ["left rod normal stress sigma_1", sigma1],
      ["right rod normal stress sigma_2", sigma2],
      ["pin shear stress tau_A", tauA]
    ].sort((left, right) => right[1] - left[1])[0];
    values.clevis_largest_stress_mode = largestStress[0];
    values.clevis_largest_stress_MPa = formatDerived(largestStress[1], 2);

    const clevisFosValues = [];
    if (Number.isFinite(clevisNormalAllowable) && clevisNormalAllowable > 0) {
      const fos1 = clevisNormalAllowable / sigma1;
      const fos2 = clevisNormalAllowable / sigma2;
      values.clevis_fos_1 = formatDerived(fos1, 2);
      values.clevis_fos_2 = formatDerived(fos2, 2);
      clevisFosValues.push(["left rod normal stress", fos1], ["right rod normal stress", fos2]);
    }
    if (Number.isFinite(clevisShearAllowable) && clevisShearAllowable > 0) {
      const fosPin = clevisShearAllowable / tauA;
      values.clevis_fos_pin = formatDerived(fosPin, 2);
      clevisFosValues.push(["pin shear", fosPin]);
    }
    const clevisGoverningFos = clevisFosValues.sort((left, right) => left[1] - right[1])[0];
    if (clevisGoverningFos) {
      values.clevis_governing_fos_mode = clevisGoverningFos[0];
      values.clevis_governing_fos = formatDerived(clevisGoverningFos[1], 2);
    }
  }

  const axialLoad = numericValue(values, "P");
  const axialTubeLength = numericValue(values, "L_AB");
  const axialRodLength = numericValue(values, "L_BC");
  const axialTubeArea = numericValue(values, "A_AB");
  const axialRodDiameter = numericValue(values, "d_BC");
  const axialAluminumModulus = numericValue(values, "E_al");
  const axialSteelModulus = numericValue(values, "E_st");

  if (
    Number.isFinite(axialLoad) && axialLoad > 0 &&
    Number.isFinite(axialTubeLength) && axialTubeLength > 0 &&
    Number.isFinite(axialRodLength) && axialRodLength > 0 &&
    Number.isFinite(axialTubeArea) && axialTubeArea > 0 &&
    Number.isFinite(axialRodDiameter) && axialRodDiameter > 0 &&
    Number.isFinite(axialAluminumModulus) && axialAluminumModulus > 0 &&
    Number.isFinite(axialSteelModulus) && axialSteelModulus > 0
  ) {
    const loadN = axialLoad * 1000;
    const rodArea = Math.PI * axialRodDiameter ** 2 / 4;
    const aluminumModulusMPa = axialAluminumModulus * 1000;
    const steelModulusMPa = axialSteelModulus * 1000;
    const rodElongation = loadN * axialRodLength / (rodArea * steelModulusMPa);
    const tubeShortening = loadN * axialTubeLength / (axialTubeArea * aluminumModulusMPa);
    values.axial_load_N = formatDerived(loadN);
    values.axial_area_BC_mm2 = formatDerived(rodArea, 2);
    values.axial_force_BC_kN = formatDerived(axialLoad, 1);
    values.axial_force_AB_kN = formatDerived(-axialLoad, 1);
    values.axial_E_al_MPa = formatDerived(aluminumModulusMPa);
    values.axial_E_st_MPa = formatDerived(steelModulusMPa);
    values.axial_rod_elongation_mm = formatDerived(rodElongation, 3);
    values.axial_tube_shortening_mm = formatDerived(tubeShortening, 3);
    values.axial_total_displacement_mm = formatDerived(rodElongation + tubeShortening, 3);
  }

  const springLoad = numericValue(values, "P");
  const springInitialDistance = numericValue(values, "d0");
  const springStiffness = numericValue(values, "k");
  const springMemberDiameter = numericValue(values, "d_b");
  const springSteelModulus = numericValue(values, "E_s");
  const springBoltCount = numericValue(values, "n_b");
  const springRodLength = numericValue(values, "L_E");
  const springBoltLength = numericValue(values, "L_b");

  if (
    Number.isFinite(springLoad) && springLoad > 0 &&
    Number.isFinite(springInitialDistance) && springInitialDistance > 0 &&
    Number.isFinite(springStiffness) && springStiffness > 0 &&
    Number.isFinite(springMemberDiameter) && springMemberDiameter > 0 &&
    Number.isFinite(springSteelModulus) && springSteelModulus > 0 &&
    Number.isFinite(springBoltCount) && springBoltCount > 0 &&
    Number.isFinite(springRodLength) && springRodLength > 0 &&
    Number.isFinite(springBoltLength) && springBoltLength > 0
  ) {
    const memberArea = Math.PI * springMemberDiameter ** 2 / 4;
    const boltForce = springLoad / springBoltCount;
    const springCompression = springLoad / springStiffness;
    const rodElongation = springLoad * springRodLength / (memberArea * springSteelModulus);
    const boltElongation = boltForce * springBoltLength / (memberArea * springSteelModulus);
    const distanceIncrease = springCompression + rodElongation + boltElongation;
    const dominant = [
      ["spring compression", springCompression],
      ["coupling-rod elongation", rodElongation],
      ["side-bolt elongation", boltElongation]
    ].sort((left, right) => right[1] - left[1])[0];
    values.spring_member_area_in2 = formatDerived(memberArea, 5);
    values.spring_force_kip = formatDerived(springLoad, 2);
    values.spring_rod_force_kip = formatDerived(springLoad, 2);
    values.spring_bolt_force_kip = formatDerived(boltForce, 2);
    values.spring_compression_in = formatDerived(springCompression, 5);
    values.spring_rod_elongation_in = formatDerived(rodElongation, 5);
    values.spring_bolt_elongation_in = formatDerived(boltElongation, 5);
    values.spring_distance_increase_in = formatDerived(distanceIncrease, 5);
    values.spring_final_distance_in = formatDerived(springInitialDistance + distanceIncrease, 3);
    values.spring_dominant_component = dominant[0];
    values.spring_dominant_value_in = formatDerived(dominant[1], 5);
  }

  const leverLoad = numericValue(values, "P");
  const leverArmAE = numericValue(values, "x_AE");
  const leverArmCE = numericValue(values, "x_CE");
  const leverHandleLength = numericValue(values, "L_h");
  const leverWireLength = numericValue(values, "L_w");
  const leverWireDiameter = numericValue(values, "d_w");
  const leverModulus = numericValue(values, "E_s");
  const leverYieldStress = numericValue(values, "sigma_y");

  if (
    Number.isFinite(leverLoad) && leverLoad > 0 &&
    Number.isFinite(leverArmAE) && leverArmAE > 0 &&
    Number.isFinite(leverArmCE) && leverArmCE > 0 &&
    Number.isFinite(leverHandleLength) && leverHandleLength > 0 &&
    Number.isFinite(leverWireLength) && leverWireLength > 0 &&
    Number.isFinite(leverWireDiameter) && leverWireDiameter > 0 &&
    Number.isFinite(leverModulus) && leverModulus > 0 &&
    Number.isFinite(leverYieldStress) && leverYieldStress > 0
  ) {
    const area = Math.PI * leverWireDiameter ** 2 / 4;
    const modulusMPa = leverModulus * 1000;
    const appliedMoment = leverLoad * 1000 * leverHandleLength;
    const compatibilityRatio = leverArmAE / leverArmCE;
    const elasticScale = appliedMoment / (leverArmAE ** 2 + leverArmCE ** 2);
    const trialAB = elasticScale * leverArmAE;
    const trialCD = elasticScale * leverArmCE;
    const yieldForce = leverYieldStress * area;
    const yieldElongation = yieldForce * leverWireLength / (area * modulusMPa);
    const plasticMomentCapacity = yieldForce * (leverArmAE + leverArmCE);
    const tolerance = 1e-8 * Math.max(plasticMomentCapacity, 1);
    let finalAB, finalCD, deltaAB, deltaCD;
    let plasticAB = 0;
    let plasticCD = 0;
    let stateAB, stateCD, regime, recommendation;

    if (trialAB <= yieldForce + tolerance && trialCD <= yieldForce + tolerance) {
      finalAB = trialAB;
      finalCD = trialCD;
      deltaAB = finalAB * leverWireLength / (area * modulusMPa);
      deltaCD = finalCD * leverWireLength / (area * modulusMPa);
      stateAB = "elastic";
      stateCD = "elastic";
      regime = "Both wires remain elastic, so the elastic trial solution is the final solution.";
      recommendation = "Neither wire yields under the assigned load in this idealized model. Preserve an appropriate design margin and complete the omitted component and connection checks before accepting the mechanism.";
    } else if (appliedMoment <= plasticMomentCapacity + tolerance && trialAB >= trialCD) {
      finalAB = yieldForce;
      finalCD = (appliedMoment - yieldForce * leverArmAE) / leverArmCE;
      deltaCD = finalCD * leverWireLength / (area * modulusMPa);
      deltaAB = compatibilityRatio * deltaCD;
      plasticAB = Math.max(0, deltaAB - yieldElongation);
      stateAB = "yielded (elastic-perfectly plastic)";
      stateCD = "elastic";
      regime = "Wire AB reaches yield first. Its force is capped at the yield force, and wire CD supplies the remaining resisting moment.";
      recommendation = "Wire AB yields and develops permanent elongation under the assigned load. The baseline configuration should not be accepted for service without increasing wire capacity, reducing the applied moment, or explicitly designing for controlled plastic response.";
    } else if (appliedMoment <= plasticMomentCapacity + tolerance) {
      finalCD = yieldForce;
      finalAB = (appliedMoment - yieldForce * leverArmCE) / leverArmAE;
      deltaAB = finalAB * leverWireLength / (area * modulusMPa);
      deltaCD = deltaAB / compatibilityRatio;
      plasticCD = Math.max(0, deltaCD - yieldElongation);
      stateAB = "elastic";
      stateCD = "yielded (elastic-perfectly plastic)";
      regime = "Wire CD reaches yield first. Its force is capped at the yield force, and wire AB supplies the remaining resisting moment.";
      recommendation = "Wire CD yields and develops permanent elongation under the assigned load. The baseline configuration should not be accepted for service without increasing wire capacity, reducing the applied moment, or explicitly designing for controlled plastic response.";
    } else {
      finalAB = yieldForce;
      finalCD = yieldForce;
      if (compatibilityRatio >= 1) {
        deltaCD = yieldElongation;
        deltaAB = compatibilityRatio * deltaCD;
        plasticAB = Math.max(0, deltaAB - yieldElongation);
      } else {
        deltaAB = yieldElongation;
        deltaCD = deltaAB / compatibilityRatio;
        plasticCD = Math.max(0, deltaCD - yieldElongation);
      }
      stateAB = "at yield at mechanism formation";
      stateCD = "at yield at mechanism formation";
      regime = "The applied moment exceeds the idealized fully plastic capacity. Static equilibrium cannot be maintained by the two perfectly plastic wires; the reported elongations describe the onset of mechanism formation.";
      recommendation = "The assigned load exceeds the idealized fully plastic moment capacity, so this configuration is unacceptable. Increase wire capacity or lever-arm effectiveness, or reduce the applied moment before completing the remaining design checks.";
    }

    values.lever_wire_area_mm2 = formatDerived(area, 3);
    values.lever_applied_moment_Nmm = formatDerived(appliedMoment, 0);
    values.lever_compatibility_ratio = formatDerived(compatibilityRatio, 3);
    values.lever_trial_T_AB_kN = formatDerived(trialAB / 1000, 3);
    values.lever_trial_T_CD_kN = formatDerived(trialCD / 1000, 3);
    values.lever_yield_force_kN = formatDerived(yieldForce / 1000, 3);
    values.lever_trial_assessment = trialAB <= yieldForce + tolerance && trialCD <= yieldForce + tolerance
      ? "Both elastic trial forces are at or below the yield force, so the trial solution is valid."
      : trialAB >= trialCD
        ? "The AB trial force exceeds the yield force, so the all-elastic trial solution is invalid and AB must be treated as yielded."
        : "The CD trial force exceeds the yield force, so the all-elastic trial solution is invalid and CD must be treated as yielded.";
    values.lever_final_T_AB_kN = formatDerived(finalAB / 1000, 3);
    values.lever_final_T_CD_kN = formatDerived(finalCD / 1000, 3);
    values.lever_state_AB = stateAB;
    values.lever_state_CD = stateCD;
    values.lever_regime = regime;
    values.lever_delta_AB_mm = formatDerived(deltaAB, 3);
    values.lever_delta_CD_mm = formatDerived(deltaCD, 3);
    values.lever_yield_elongation_mm = formatDerived(yieldElongation, 3);
    values.lever_plastic_AB_mm = formatDerived(plasticAB, 3);
    values.lever_plastic_CD_mm = formatDerived(plasticCD, 3);
    values.lever_plastic_moment_capacity_Nmm = formatDerived(plasticMomentCapacity, 0);
    values.lever_recommendation = recommendation;
  }

  const linkAllowableStress = numericValue(values, "sigma_allow");
  const linkThickness = numericValue(values, "t");
  const linkEndWidth = numericValue(values, "w_1");
  const linkCenterWidth = numericValue(values, "w_2");
  const linkLengthAB = numericValue(values, "L_AB");
  const linkLengthBC = numericValue(values, "L_BC");
  const linkLengthCD = numericValue(values, "L_CD");
  const linkModulus = numericValue(values, "E");

  if (
    Number.isFinite(linkAllowableStress) && linkAllowableStress > 0 &&
    Number.isFinite(linkThickness) && linkThickness > 0 &&
    Number.isFinite(linkEndWidth) && linkEndWidth > 0 &&
    Number.isFinite(linkCenterWidth) && linkCenterWidth > 0 &&
    Number.isFinite(linkLengthAB) && linkLengthAB > 0 &&
    Number.isFinite(linkLengthBC) && linkLengthBC > 0 &&
    Number.isFinite(linkLengthCD) && linkLengthCD > 0 &&
    Number.isFinite(linkModulus) && linkModulus > 0
  ) {
    const areaAB = linkEndWidth * linkThickness;
    const areaBC = linkCenterWidth * linkThickness;
    const areaCD = areaAB;
    const criticalArea = Math.min(areaAB, areaBC, areaCD);
    const pMax = linkAllowableStress * criticalArea;
    const stressAB = pMax / areaAB;
    const stressBC = pMax / areaBC;
    const stressCD = pMax / areaCD;
    const elongationAB = pMax * linkLengthAB / (areaAB * linkModulus);
    const elongationBC = pMax * linkLengthBC / (areaBC * linkModulus);
    const elongationCD = pMax * linkLengthCD / (areaCD * linkModulus);
    const elongationEntries = [["AB", elongationAB], ["BC", elongationBC], ["CD", elongationCD]];
    const dominantElongation = elongationEntries.sort((left, right) => right[1] - left[1])[0];
    const endSegmentsGovern = Math.abs(areaAB - criticalArea) < 1e-9;
    const centerSegmentGoverns = Math.abs(areaBC - criticalArea) < 1e-9;
    const criticalSection = endSegmentsGovern && centerSegmentGoverns
      ? "all three constant-area segments"
      : endSegmentsGovern ? "end segments AB and CD" : "center segment BC";
    values.link_area_AB_mm2 = formatDerived(areaAB, 1);
    values.link_area_BC_mm2 = formatDerived(areaBC, 1);
    values.link_area_CD_mm2 = formatDerived(areaCD, 1);
    values.link_critical_area_mm2 = formatDerived(criticalArea, 1);
    values.link_critical_section = criticalSection;
    values.link_critical_verb = criticalSection === "center segment BC" ? "governs" : "govern";
    values.link_pmax_N = formatDerived(pMax, 0);
    values.link_pmax_kN = formatDerived(pMax / 1000, 2);
    values.link_stress_AB_MPa = formatDerived(stressAB, 1);
    values.link_stress_BC_MPa = formatDerived(stressBC, 1);
    values.link_stress_CD_MPa = formatDerived(stressCD, 1);
    values.link_delta_AB_mm = formatDerived(elongationAB, 3);
    values.link_delta_BC_mm = formatDerived(elongationBC, 3);
    values.link_delta_CD_mm = formatDerived(elongationCD, 3);
    values.link_delta_total_mm = formatDerived(elongationAB + elongationBC + elongationCD, 3);
    values.link_dominant_segment = dominantElongation[0];
    values.link_dominant_elongation_mm = formatDerived(dominantElongation[1], 3);
    values.link_strength_modification = centerSegmentGoverns && !endSegmentsGovern
      ? "Increase center width w2 or the common thickness t to enlarge the governing center-section area."
      : endSegmentsGovern && !centerSegmentGoverns
        ? "Increase end width w1 or the common thickness t to enlarge the governing end-section area."
        : "Increase the common thickness t or increase all governing segment widths so that every minimum area grows.";
  }

  const thermalLength = numericValue(values, "L");
  const thermalOuterDiameter = numericValue(values, "D_o");
  const thermalThickness = numericValue(values, "t");
  const thermalT1 = numericValue(values, "T_1");
  const thermalT2 = numericValue(values, "T_2");
  const thermalSupportStiffness = numericValue(values, "k");
  const thermalModulus = numericValue(values, "E");
  const thermalCoefficient = numericValue(values, "alpha");
  const thermalYieldStress = numericValue(values, "sigma_y");

  if (
    Number.isFinite(thermalLength) && thermalLength > 0 &&
    Number.isFinite(thermalOuterDiameter) && thermalOuterDiameter > 0 &&
    Number.isFinite(thermalThickness) && thermalThickness > 0 && thermalThickness < thermalOuterDiameter / 2 &&
    Number.isFinite(thermalT1) && Number.isFinite(thermalT2) &&
    Number.isFinite(thermalSupportStiffness) && thermalSupportStiffness > 0 &&
    Number.isFinite(thermalModulus) && thermalModulus > 0 &&
    Number.isFinite(thermalCoefficient) && thermalCoefficient > 0 &&
    Number.isFinite(thermalYieldStress) && thermalYieldStress > 0
  ) {
    const innerDiameter = thermalOuterDiameter - 2 * thermalThickness;
    const pipeArea = Math.PI * (thermalOuterDiameter ** 2 - innerDiameter ** 2) / 4;
    const temperatureChange = thermalT2 - thermalT1;
    const freeDeformation = thermalCoefficient * thermalLength * temperatureChange;
    const pipeCompliance = thermalLength / (pipeArea * thermalModulus);
    const supportCompliance = 2 / thermalSupportStiffness;
    const totalCompliance = pipeCompliance + supportCompliance;
    const pipeForce = freeDeformation / totalCompliance;
    const forceMagnitude = Math.abs(pipeForce);
    const pipeStress = pipeForce / pipeArea;
    const stressMagnitude = Math.abs(pipeStress);
    const yieldRatio = stressMagnitude > 0 ? thermalYieldStress / stressMagnitude : Infinity;
    values.thermal_inner_diameter_in = formatDerived(innerDiameter, 3);
    values.thermal_pipe_area_in2 = formatDerived(pipeArea, 5);
    values.thermal_delta_T_F = formatDerived(temperatureChange, 1);
    values.thermal_action = temperatureChange > 0 ? "free thermal expansion" : temperatureChange < 0 ? "free thermal contraction" : "no free thermal deformation";
    values.thermal_force_state = temperatureChange > 0 ? "compression" : temperatureChange < 0 ? "tension" : "no axial load";
    values.thermal_stress_state = temperatureChange > 0 ? "compression" : temperatureChange < 0 ? "tension" : "no axial stress";
    values.thermal_free_expansion_in = formatDerived(freeDeformation, 5);
    values.thermal_free_expansion_magnitude_in = formatDerived(Math.abs(freeDeformation), 5);
    values.thermal_pipe_compliance_in_per_kip = formatDerived(pipeCompliance, 7);
    values.thermal_support_compliance_in_per_kip = formatDerived(supportCompliance, 7);
    values.thermal_total_compliance_in_per_kip = formatDerived(totalCompliance, 7);
    values.thermal_pipe_force_kip = formatDerived(pipeForce, 2);
    values.thermal_pipe_force_magnitude_kip = formatDerived(forceMagnitude, 2);
    values.thermal_pipe_elastic_deformation_in = formatDerived(forceMagnitude * pipeCompliance, 5);
    values.thermal_support_displacement_each_in = formatDerived(forceMagnitude / thermalSupportStiffness, 5);
    values.thermal_support_displacement_total_in = formatDerived(forceMagnitude * supportCompliance, 5);
    values.thermal_pipe_stress_ksi = formatDerived(pipeStress, 2);
    values.thermal_pipe_stress_magnitude_ksi = formatDerived(stressMagnitude, 2);
    values.thermal_yield_ratio = Number.isFinite(yieldRatio) ? formatDerived(yieldRatio, 2) : "not applicable";
    values.thermal_yield_assessment = stressMagnitude < thermalYieldStress
      ? `The average axial stress remains below the ${formatDerived(thermalYieldStress, 1)} ksi yield stress, but the limited margin requires further design review.`
      : `The average axial stress reaches or exceeds the ${formatDerived(thermalYieldStress, 1)} ksi yield stress, so this baseline configuration is not acceptable under the elastic model.`;
    values.thermal_dominant_compliance = pipeCompliance >= supportCompliance ? "pipe axial compliance" : "combined turbine-attachment compliance";
  }

  const platformLoad = numericValue(values, "P");
  const platformWireArea = numericValue(values, "A_w");
  const platformWireModulus = numericValue(values, "E_w");
  const platformUpperWireLength = numericValue(values, "L_u");
  const platformLowerWireLength = numericValue(values, "L_l");
  const platformUpperSpan = numericValue(values, "L_DC");
  const platformLowerSpan = numericValue(values, "L_AB");
  const platformHLocation = numericValue(values, "x_DH");
  const platformLoadLocation = numericValue(values, "x_P");

  if (
    Number.isFinite(platformLoad) && platformLoad > 0 &&
    Number.isFinite(platformWireArea) && platformWireArea > 0 &&
    Number.isFinite(platformWireModulus) && platformWireModulus > 0 &&
    Number.isFinite(platformUpperWireLength) && platformUpperWireLength > 0 &&
    Number.isFinite(platformLowerWireLength) && platformLowerWireLength > 0 &&
    Number.isFinite(platformUpperSpan) && platformUpperSpan > 0 &&
    Number.isFinite(platformLowerSpan) && platformLowerSpan > 0 &&
    Number.isFinite(platformHLocation) && platformHLocation > 0 && platformHLocation < platformUpperSpan &&
    Number.isFinite(platformLoadLocation) && platformLoadLocation > 0 && platformLoadLocation < platformLowerSpan
  ) {
    const modulusPsi = platformWireModulus * 1000;
    const upperLengthIn = platformUpperWireLength * 12;
    const lowerLengthIn = platformLowerWireLength * 12;
    const upperSpanIn = platformUpperSpan * 12;
    const lowerSpanIn = platformLowerSpan * 12;
    const forceBC = platformLoad * platformLoadLocation / platformLowerSpan;
    const forceAH = platformLoad - forceBC;
    const forceFC = (forceAH * platformHLocation + forceBC * platformUpperSpan) / platformUpperSpan;
    const forceED = platformLoad - forceFC;
    const elongationAH = forceAH * lowerLengthIn / (platformWireArea * modulusPsi);
    const elongationBC = forceBC * lowerLengthIn / (platformWireArea * modulusPsi);
    const elongationED = forceED * upperLengthIn / (platformWireArea * modulusPsi);
    const elongationFC = forceFC * upperLengthIn / (platformWireArea * modulusPsi);
    const displacementH = elongationED + (elongationFC - elongationED) * platformHLocation / platformUpperSpan;
    const displacementA = displacementH + elongationAH;
    const displacementB = elongationFC + elongationBC;
    const loadDisplacement = displacementA + (displacementB - displacementA) * platformLoadLocation / platformLowerSpan;
    const thetaAB = (displacementB - displacementA) / lowerSpanIn;
    const thetaDC = (elongationFC - elongationED) / upperSpanIn;
    const forceEntries = [["AH", forceAH], ["BC", forceBC], ["ED", forceED], ["FC", forceFC]];
    const elongationEntries = [["AH", elongationAH], ["BC", elongationBC], ["ED", elongationED], ["FC", elongationFC]];
    const governingForce = forceEntries.sort((left, right) => right[1] - left[1])[0];
    const governingElongation = elongationEntries.sort((left, right) => right[1] - left[1])[0];
    values.platform_x_HC_ft = formatDerived(platformUpperSpan - platformHLocation, 2);
    values.platform_T_AH_lb = formatDerived(forceAH, 1);
    values.platform_T_BC_lb = formatDerived(forceBC, 1);
    values.platform_T_ED_lb = formatDerived(forceED, 1);
    values.platform_T_FC_lb = formatDerived(forceFC, 1);
    values.platform_delta_AH_in = formatDerived(elongationAH, 5);
    values.platform_delta_BC_in = formatDerived(elongationBC, 5);
    values.platform_delta_ED_in = formatDerived(elongationED, 5);
    values.platform_delta_FC_in = formatDerived(elongationFC, 5);
    values.platform_delta_H_in = formatDerived(displacementH, 5);
    values.platform_delta_A_in = formatDerived(displacementA, 5);
    values.platform_delta_B_in = formatDerived(displacementB, 5);
    values.platform_delta_load_in = formatDerived(loadDisplacement, 5);
    values.platform_theta_AB_rad = formatDerived(Math.abs(thetaAB), 7);
    values.platform_theta_AB_deg = formatDerived(Math.abs(thetaAB) * 180 / Math.PI, 4);
    values.platform_theta_DC_rad = formatDerived(Math.abs(thetaDC), 8);
    values.platform_theta_DC_deg = formatDerived(Math.abs(thetaDC) * 180 / Math.PI, 5);
    values.platform_lower_tilt_direction = thetaAB < 0 ? "downward toward A" : "downward toward B";
    values.platform_upper_tilt_direction = thetaDC < 0 ? "downward toward D" : "downward toward C";
    values.platform_governing_wire = governingForce[0];
    values.platform_governing_force_lb = formatDerived(governingForce[1], 1);
    values.platform_dominant_wire = governingElongation[0];
    values.platform_dominant_elongation_in = formatDerived(governingElongation[1], 5);
  }

  const cableMass = numericValue(values, "m");
  const cableGravity = numericValue(values, "g");
  const cableThetaAB = numericValue(values, "theta_AB");
  const cableThetaBC = numericValue(values, "theta_BC");
  const cableSigmaFail = numericValue(values, "sigma_fail");
  const cableFosReq = numericValue(values, "FOS_req");
  const cableDAB = numericValue(values, "d_AB");
  const cableDBC = numericValue(values, "d_BC");

  if (
    Number.isFinite(cableMass) &&
    Number.isFinite(cableGravity) &&
    Number.isFinite(cableThetaAB) &&
    Number.isFinite(cableThetaBC)
  ) {
    const thetaABRad = cableThetaAB * Math.PI / 180;
    const thetaBCRad = cableThetaBC * Math.PI / 180;
    const sinAB = Math.sin(thetaABRad);
    const cosAB = Math.cos(thetaABRad);
    const sinBC = Math.sin(thetaBCRad);
    const cosBC = Math.cos(thetaBCRad);
    const denominator = sinAB + cosAB * sinBC / cosBC;
    if (cosBC > 0 && denominator > 0) {
      const weight = cableMass * cableGravity;
      const tensionAB = weight / denominator;
      const tensionBC = tensionAB * cosAB / cosBC;
      values.cable_weight_N = formatDerived(weight, 1);
      values.cable_T_AB_N = formatDerived(tensionAB, 1);
      values.cable_T_BC_N = formatDerived(tensionBC, 1);
      values.cable_T_AB_kN = formatDerived(tensionAB / 1000, 3);
      values.cable_T_BC_kN = formatDerived(tensionBC / 1000, 3);
      values.cable_governing_tension_member = tensionAB >= tensionBC ? "AB" : "BC";

      if (Number.isFinite(cableSigmaFail) && cableSigmaFail > 0 && Number.isFinite(cableFosReq) && cableFosReq > 0) {
        const allowable = cableSigmaFail / cableFosReq;
        const areaReqAB = tensionAB / allowable;
        const areaReqBC = tensionBC / allowable;
        values.cable_allowable_stress_MPa = formatDerived(allowable, 1);
        values.cable_A_AB_req_mm2 = formatDerived(areaReqAB, 3);
        values.cable_A_BC_req_mm2 = formatDerived(areaReqBC, 3);
        values.cable_d_AB_min_mm = formatDerived(Math.sqrt(4 * areaReqAB / Math.PI), 3);
        values.cable_d_BC_min_mm = formatDerived(Math.sqrt(4 * areaReqBC / Math.PI), 3);
      }

      if (Number.isFinite(cableDAB) && cableDAB > 0 && Number.isFinite(cableDBC) && cableDBC > 0) {
        const areaAB = Math.PI * cableDAB ** 2 / 4;
        const areaBC = Math.PI * cableDBC ** 2 / 4;
        const stressAB = tensionAB / areaAB;
        const stressBC = tensionBC / areaBC;
        values.cable_A_AB_mm2 = formatDerived(areaAB, 3);
        values.cable_A_BC_mm2 = formatDerived(areaBC, 3);
        values.cable_sigma_AB_MPa = formatDerived(stressAB, 1);
        values.cable_sigma_BC_MPa = formatDerived(stressBC, 1);

        if (Number.isFinite(cableSigmaFail) && cableSigmaFail > 0) {
          const fosAB = cableSigmaFail / stressAB;
          const fosBC = cableSigmaFail / stressBC;
          const governingFosMember = fosAB <= fosBC ? "AB" : "BC";
          const governingFos = Math.min(fosAB, fosBC);
          values.cable_FOS_AB = formatDerived(fosAB, 2);
          values.cable_FOS_BC = formatDerived(fosBC, 2);
          values.cable_governing_fos_member = governingFosMember;
          values.cable_governing_fos = formatDerived(governingFos, 2);
          values.cable_design_recommendation = Number.isFinite(cableFosReq) && governingFos >= cableFosReq
            ? `both selected cables meet the required FOS of ${formatDerived(cableFosReq, 1)} for static tensile strength, with cable ${governingFosMember} governing`
            : `cable ${governingFosMember} does not meet the required static tensile FOS`;
        }
      }
    }
  }

  return values;
}

function substitute(template, problem, currentValues) {
  const values = variableMap(problem, currentValues);
  return String(template || "").replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (_, key) => {
    if (key.endsWith("_unit")) {
      return unitHtml(values[key]);
    }
    return escapeHtml(values[key] ?? "");
  });
}

function selectedQuestions(problem, variant) {
  if (variant?.selectedQuestions) {
    return problem.questions.filter((question) => variant.selectedQuestions.includes(question.id));
  }
  return problem.questions.filter((question) => question.selected);
}

const questionSections = [
  { id: "context", title: "Context and Mechanics Reasoning Questions" },
  { id: "transition", title: "Transition to a Mechanics Model" },
  { id: "analysis", title: "Mechanics Analysis Questions" }
];

function questionsBySection(questions, section) {
  return questions.filter((question) => (question.section || "analysis") === section);
}

function questionImageFile(problem, question) {
  if (!question.image) {
    return "";
  }
  const image = String(question.image);
  if (/^https?:/.test(image)) {
    return image;
  }
  if (path.isAbsolute(image)) {
    return image;
  }
  return path.join(root, "problems", problem.slug, image);
}

function renderQuestionImageHtml(problem, question) {
  const src = questionImageFile(problem, question);
  if (!src) {
    return "";
  }
  const alt = question.imageAlt || `${question.title} supporting image`;
  return `<figure class="question-image"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"></figure>`;
}

function renderQuestionImageMarkdown(problem, question, outDir) {
  const src = questionImageFile(problem, question);
  if (!src) {
    return "";
  }
  const imagePath = /^https?:/.test(src)
    ? src
    : path.relative(outDir, src).split(path.sep).join("/");
  const alt = String(question.imageAlt || `${question.title} supporting image`).replace(/]/g, "\\]");
  return `![${alt}](<${imagePath}>)\n\n`;
}

function problemImageMarkdown(problem, image, alt, outDir) {
  if (!image) {
    return "";
  }
  const imagePath = path
    .relative(outDir, path.join(root, image))
    .split(path.sep)
    .join("/");
  const safeAlt = String(alt || `${problem.title} image`).replace(/]/g, "\\]");
  return `![${safeAlt}](<${imagePath}>)`;
}

function renderIdealizedImageHtml(problem) {
  if (!problem.idealizedImage) {
    return "";
  }
  const imagePath = path.join(root, problem.idealizedImage);
  const alt = problem.idealizedImageAlt || `${problem.title} instructor reference idealization`;
  return `<section><h2>Instructor Reference Idealization and Input Variables</h2><figure><img src="${escapeHtml(imagePath)}" alt="${escapeHtml(alt)}"></figure></section>`;
}

function documentStyles() {
  return `
body { color: #343a40; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.5; margin: 2rem auto; max-width: 850px; padding: 0 1rem; }
h1 { font-size: 2rem; line-height: 1.15; }
h2 { border-bottom: 1px solid #dee2e6; font-size: 1.25rem; margin-top: 1.8rem; padding-bottom: 0.3rem; }
h3 { font-size: 1.05rem; margin-top: 1.4rem; }
h4 { font-size: 0.95rem; margin: 0 0 0.45rem; }
img { height: auto; max-width: 100%; }
table { border-collapse: collapse; margin-top: 0.75rem; width: 100%; }
th, td { border: 1px solid #dee2e6; padding: 0.55rem; text-align: left; vertical-align: top; }
th { background: #f8f9fa; }
.packet-kicker { color: #1f5fb8; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
.question-meta { color: #6c757d; font-size: 0.86rem; margin-top: -0.25rem; }
.answer-block { background: #f8f9fa; border-left: 4px solid #2780e3; margin-top: 0.75rem; padding: 0.75rem 0.9rem; }
.learning-objectives, .support-block { border: 1px solid #dee2e6; margin-top: 0.75rem; padding: 0.75rem 0.9rem; }
@media print { body { margin: 0.5in auto; } }`;
}

function renderLearningObjectives(question) {
  if (!Array.isArray(question.learningObjectives) || question.learningObjectives.length === 0) {
    return "";
  }
  return `<div class="learning-objectives"><h4>Learning Objectives</h4><ul>${question.learningObjectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join("")}</ul></div>`;
}

function renderInstructorSupport(question, problem, values) {
  const gradingNotes = question.gradingNotes ? `<div class="support-block"><h4>Grading Notes</h4>${substitute(question.gradingNotes, problem, values)}</div>` : "";
  const commonMistakes = question.commonMistakes ? `<div class="support-block"><h4>Common Mistakes</h4>${substitute(question.commonMistakes, problem, values)}</div>` : "";
  return `${renderLearningObjectives(question)}${gradingNotes}${commonMistakes}`;
}

function renderQuestionSectionHtml(problem, questions, section, isInstructor, values, numberById) {
  const sectionQuestions = questionsBySection(questions, section.id);
  if (sectionQuestions.length === 0) {
    return "";
  }

  return `
  <section class="packet-question-section">
    <h2>${section.title}</h2>
    ${sectionQuestions.map((question) => `
      <section class="generated-question">
        <h3>${numberById.get(question.id)}. ${escapeHtml(question.title)}</h3>
        <p class="question-meta">${[question.type, question.difficulty, ...(question.tags || [])].filter(Boolean).map(escapeHtml).join(" · ")}</p>
        ${renderQuestionImageHtml(problem, question)}
        ${substitute(question.student, problem, values)}
        ${isInstructor ? `<div class="answer-block"><h4>Representative Instructor Answer</h4>${substitute(question.instructor, problem, values)}</div>${renderInstructorSupport(question, problem, values)}` : ""}
      </section>`).join("")}
  </section>`;
}

function renderBody(problem, variant, type) {
  const isInstructor = type === "instructor";
  const documentTitle = isInstructor ? problem.instructorDocumentTitle : problem.studentDocumentTitle;
  const values = { ...(variant?.variables || {}) };
  const questions = selectedQuestions(problem, variant);
  const numberById = new Map(questions.map((question, index) => [question.id, index + 1]));
  const imagePath = path.join(root, problem.image);

  const rows = problem.variables.map((variable) => {
    const value = values[variable.key] ?? variable.value;
    return `<tr><td>${symbolHtml(variable.symbol)}</td><td>${escapeHtml(variable.label)}</td><td>${valueWithUnitHtml(value, variable.unit)}</td></tr>`;
  }).join("");

  return `
<article class="generated-packet">
  <header>
    <p class="packet-kicker">${escapeHtml(documentTitle)}</p>
    <h1>${escapeHtml(problem.title)}</h1>
    <p>${escapeHtml(problem.summary)}</p>
  </header>
  <figure><img src="${escapeHtml(imagePath)}" alt="${escapeHtml(problem.title)} problem image"></figure>
  <section><h2>Main Problem Statement</h2>${substitute(problem.problemStatement, problem, values)}</section>
  <section><h2>Engineering Design Goal</h2>${substitute(problem.engineeringGoal, problem, values)}</section>
  ${renderQuestionSectionHtml(problem, questions, questionSections[0], isInstructor, values, numberById)}
  ${renderQuestionSectionHtml(problem, questions, questionSections[1], isInstructor, values, numberById)}
  ${renderIdealizedImageHtml(problem)}
  <section><h2>Given Data</h2><table><thead><tr><th>Symbol</th><th>Quantity</th><th>Value</th></tr></thead><tbody>${rows}</tbody></table></section>
  ${renderQuestionSectionHtml(problem, questions, questionSections[2], isInstructor, values, numberById)}
</article>`;
}

function fullHtml(problem, variant, type) {
  const title = type === "instructor" ? problem.instructorDocumentTitle : problem.studentDocumentTitle;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - ${escapeHtml(problem.title)}</title>
  <style>${documentStyles()}</style>
</head>
<body>
${renderBody(problem, variant, type)}
</body>
</html>`;
}

function qmdDocument(problem, variant, type, outDir) {
  const title = type === "instructor" ? problem.instructorDocumentTitle : problem.studentDocumentTitle;
  const isInstructor = type === "instructor";
  const values = { ...(variant?.variables || {}) };
  const questions = selectedQuestions(problem, variant);
  const numberById = new Map(questions.map((question, index) => [question.id, index + 1]));
  const imagePath = path
    .relative(outDir, path.join(root, problem.image))
    .split(path.sep)
    .join("/");
  const idealizedImage = problemImageMarkdown(
    problem,
    problem.idealizedImage,
    problem.idealizedImageAlt || `${problem.title} instructor reference idealization`,
    outDir
  );
  const rows = problem.variables.map((variable) => {
    const value = values[variable.key] ?? variable.value;
    return `| ${tableCell(symbolHtml(variable.symbol))} | ${tableCell(variable.label)} | ${tableCell(valueWithUnitHtml(value, variable.unit))} |`;
  }).join("\n");
  const renderQuestion = (question) => {
    const meta = [question.type, question.difficulty, ...(question.tags || [])].filter(Boolean).join(" · ");
    const support = isInstructor
      ? [
          `**Representative Instructor Answer**\n\n${htmlToMarkdown(substitute(question.instructor, problem, values))}`,
          Array.isArray(question.learningObjectives) && question.learningObjectives.length > 0
            ? `**Learning Objectives**\n\n${question.learningObjectives.map((objective) => `- ${objective}`).join("\n")}`
            : "",
          question.gradingNotes ? `**Grading Notes**\n\n${htmlToMarkdown(substitute(question.gradingNotes, problem, values))}` : "",
          question.commonMistakes ? `**Common Mistakes**\n\n${htmlToMarkdown(substitute(question.commonMistakes, problem, values))}` : ""
        ].filter(Boolean).join("\n\n")
      : "";

    return `### ${numberById.get(question.id)}. ${question.title}

*${meta}*

${renderQuestionImageMarkdown(problem, question, outDir)}
${htmlToMarkdown(substitute(question.student, problem, values))}

${support}`;
  };
  const renderQuestionSection = (section) => {
    const sectionQuestions = questionsBySection(questions, section.id);
    if (sectionQuestions.length === 0) {
      return "";
    }
    return `## ${section.title}\n\n${sectionQuestions.map(renderQuestion).join("\n\n")}`;
  };

  return `---
title: "${title.replace(/"/g, '\\"')} — ${problem.title.replace(/"/g, '\\"')}"
format:
  html: default
  docx: default
  pdf:
    documentclass: scrartcl
---

![${problem.title.replace(/]/g, "\\]")} problem image](<${imagePath}>)

## Main Problem Statement

${htmlToMarkdown(substitute(problem.problemStatement, problem, values))}

## Engineering Design Goal

${htmlToMarkdown(substitute(problem.engineeringGoal, problem, values))}

${renderQuestionSection(questionSections[0])}

${renderQuestionSection(questionSections[1])}

${idealizedImage ? `## Instructor Reference Idealization and Input Variables\n\n${idealizedImage}\n\n` : ""}## Given Data

| Symbol | Quantity | Value |
|---|---|---:|
${rows}

${renderQuestionSection(questionSections[2])}
`;
}

const problemKey = argValue("problem");
if (!problemKey || hasFlag("help")) {
  usage();
}

const type = argValue("type", "student");
const format = argValue("format", "html");
const variantKey = argValue("variant", "");

if (!["student", "instructor"].includes(type)) {
  throw new Error("--type must be student or instructor");
}
if (!["html", "doc", "qmd", "docx", "pdf"].includes(format)) {
  throw new Error("--format must be html, doc, qmd, docx, or pdf");
}
if (!existsSync(catalogPath)) {
  throw new Error("Catalog not found. Run node scripts/build-catalog.mjs first.");
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const problem = catalog.find((item) => item.slug === problemKey || item.id === problemKey);
if (!problem) {
  throw new Error(`Problem not found in catalog: ${problemKey}`);
}

const variant = variantKey ? (problem.variants || []).find((item) => item.id === variantKey) : null;
if (variantKey && !variant) {
  throw new Error(`Variant not found for ${problem.slug}: ${variantKey}`);
}

const outDir = path.join(root, "exports", problem.slug, variant?.id || "default");
mkdirSync(outDir, { recursive: true });

const baseName = `${problem.slug}-${variant?.id || "default"}-${type}`;

if (format === "html") {
  const outPath = path.join(outDir, `${baseName}.html`);
  writeFileSync(outPath, fullHtml(problem, variant, type));
  console.log(path.relative(root, outPath));
} else if (format === "doc") {
  const outPath = path.join(outDir, `${baseName}.doc`);
  writeFileSync(outPath, `\ufeff${fullHtml(problem, variant, type)}`);
  console.log(path.relative(root, outPath));
} else {
  const qmdPath = path.join(outDir, `${baseName}.qmd`);
  writeFileSync(qmdPath, qmdDocument(problem, variant, type, outDir));
  if (format === "qmd") {
    console.log(path.relative(root, qmdPath));
  } else {
    const result = spawnSync("quarto", ["render", qmdPath, "--to", format], {
      cwd: root,
      encoding: "utf8",
      stdio: "inherit"
    });
    if (result.status !== 0) {
      process.exit(result.status || 1);
    }
  }
}
