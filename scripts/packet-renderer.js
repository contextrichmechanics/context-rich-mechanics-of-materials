(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function numericValue(values, key) {
    const value = Number(values[key]);
    return Number.isFinite(value) ? value : null;
  }

  function unitHtml(unit) {
    const normalized = String(unit || "").trim();
    if (!normalized || normalized === "-") {
      return "";
    }
    return escapeHtml(normalized).replace(/\^(-?\d+)/g, "<sup>$1</sup>");
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

  function valueWithUnitHtml(value, unit) {
    const renderedUnit = unitHtml(unit);
    return `${escapeHtml(value)}${renderedUnit ? ` ${renderedUnit}` : ""}`;
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

  function variableMap(problem, overrides = {}) {
    const values = {};
    (problem.variables || []).forEach((variable) => {
      values[variable.key] = overrides[variable.key] ?? variable.value;
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
      const axialLoadDigits = Number.isInteger(axialLoad) ? 0 : 3;
      values.axial_force_BC_kN = formatDerived(axialLoad, axialLoadDigits);
      values.axial_force_AB_kN = formatDerived(-axialLoad, axialLoadDigits);
      values.axial_E_al_MPa = formatDerived(aluminumModulusMPa);
      values.axial_E_st_MPa = formatDerived(steelModulusMPa);
      values.axial_rod_elongation_mm = formatDerived(rodElongation, 3);
      values.axial_tube_shortening_mm = formatDerived(tubeShortening, 3);
      values.axial_total_displacement_mm = formatDerived(rodElongation + tubeShortening, 3);
      values.axial_total_displacement_rounded_mm = formatDerived(rodElongation + tubeShortening, 2);
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

    const couplingTorque = numericValue(values, "T");
    const couplingShaftRadius = numericValue(values, "r");
    const couplingBoltCircleRadius = numericValue(values, "R");
    const couplingBoltDiameter = numericValue(values, "d_b");

    if (
      Number.isFinite(couplingTorque) && couplingTorque > 0 &&
      Number.isFinite(couplingShaftRadius) && couplingShaftRadius > 0 &&
      Number.isFinite(couplingBoltCircleRadius) && couplingBoltCircleRadius > 0 &&
      Number.isFinite(couplingBoltDiameter) && couplingBoltDiameter > 0
    ) {
      const torqueNmm = couplingTorque * 1000;
      const shaftPolarMoment = Math.PI * couplingShaftRadius ** 4 / 2;
      const shaftStress = torqueNmm * couplingShaftRadius / shaftPolarMoment;
      const boltArea = Math.PI * couplingBoltDiameter ** 2 / 4;
      const requiredCount = 2 * couplingShaftRadius ** 3 /
        (couplingBoltCircleRadius * couplingBoltDiameter ** 2);
      const selectedCount = Math.max(1, Math.ceil(requiredCount - 1e-12));
      const boltForce = torqueNmm / (selectedCount * couplingBoltCircleRadius);
      const boltStress = boltForce / boltArea;
      const stressRatio = boltStress / shaftStress;
      const stressPasses = boltStress <= shaftStress * (1 + 1e-10);

      values.coupling_torque_Nmm = formatDerived(torqueNmm, 0);
      values.coupling_shaft_J_mm4 = formatDerived(shaftPolarMoment, 1);
      values.coupling_shaft_tau_MPa = formatDerived(shaftStress, 3);
      values.coupling_bolt_area_mm2 = formatDerived(boltArea, 3);
      values.coupling_n_req = formatDerived(requiredCount, 3);
      values.coupling_n_selected = formatDerived(selectedCount, 0);
      values.coupling_bolt_force_N = formatDerived(boltForce, 1);
      values.coupling_bolt_tau_MPa = formatDerived(boltStress, 3);
      values.coupling_stress_ratio = formatDerived(stressRatio, 3);
      values.coupling_stress_assessment = stressPasses
        ? "The selected bolt pattern satisfies the specified stress-matching criterion."
        : "The selected bolt pattern does not satisfy the specified stress-matching criterion.";
      values.coupling_recommendation = stressPasses
        ? `Use at least ${selectedCount} equally spaced bolts under the prescribed stress-comparison criterion. The calculated average bolt shear stress is ${formatDerived(boltStress, 3)} MPa, which does not exceed the ${formatDerived(shaftStress, 3)} MPa maximum shaft shear stress. If symmetry or manufacturing practice requires a larger count, select the next acceptable pattern.`
        : "Increase the bolt count, bolt diameter, or bolt-circle radius before completing the omitted coupling checks.";
    }

    const shaftPower = numericValue(values, "P");
    const shaftSpeed = numericValue(values, "n");
    const shaftAllowableStress = numericValue(values, "tau_allow");
    const shaftDiameterStep = 0.125;

    if (
      Number.isFinite(shaftPower) && shaftPower > 0 &&
      Number.isFinite(shaftSpeed) && shaftSpeed > 0 &&
      Number.isFinite(shaftAllowableStress) && shaftAllowableStress > 0
    ) {
      const omega = shaftSpeed * 2 * Math.PI / 60;
      const torqueLbFt = shaftPower * 550 / omega;
      const torqueLbIn = torqueLbFt * 12;
      const allowablePsi = shaftAllowableStress * 1000;
      const minimumDiameter = (16 * torqueLbIn / (Math.PI * allowablePsi)) ** (1 / 3);
      const selectedDiameter = Math.ceil(minimumDiameter / shaftDiameterStep - 1e-12) * shaftDiameterStep;
      const lowerDiameter = Math.max(0, selectedDiameter - shaftDiameterStep);
      const actualStress = 16 * torqueLbIn / (Math.PI * selectedDiameter ** 3) / 1000;
      const utilization = actualStress / shaftAllowableStress;
      const allowableFactor = shaftAllowableStress / actualStress;
      const denominator = Math.round(1 / shaftDiameterStep);
      let selectedLabel = `${formatDerived(selectedDiameter, 3)} in`;
      if (denominator > 0 && denominator <= 64 && Math.abs(shaftDiameterStep * denominator - 1) < 1e-8) {
        let numerator = Math.round(selectedDiameter * denominator);
        let divisorA = numerator;
        let divisorB = denominator;
        while (divisorB !== 0) {
          const remainder = divisorA % divisorB;
          divisorA = divisorB;
          divisorB = remainder;
        }
        numerator /= divisorA;
        const reducedDenominator = denominator / divisorA;
        const whole = Math.floor(numerator / reducedDenominator);
        const remainder = numerator % reducedDenominator;
        selectedLabel = remainder === 0
          ? `${whole} in`
          : whole > 0
            ? `${whole} ${remainder}/${reducedDenominator} in`
            : `${remainder}/${reducedDenominator} in`;
      }
      const stressPasses = actualStress <= shaftAllowableStress * (1 + 1e-10);
      values.shaft_omega_rad_s = formatDerived(omega, 2);
      values.shaft_torque_lb_ft = formatDerived(torqueLbFt, 2);
      values.shaft_torque_lb_in = formatDerived(torqueLbIn, 1);
      values.shaft_d_min_in = formatDerived(minimumDiameter, 3);
      values.shaft_d_selected_in = formatDerived(selectedDiameter, 3);
      values.shaft_d_selected_label = selectedLabel;
      values.shaft_d_lower_in = formatDerived(lowerDiameter, 3);
      values.shaft_tau_actual_ksi = formatDerived(actualStress, 2);
      values.shaft_utilization = formatDerived(utilization, 3);
      values.shaft_allowable_factor = formatDerived(allowableFactor, 3);
      values.shaft_stress_assessment = stressPasses
        ? "The selected diameter satisfies the allowable torsional shear-stress criterion."
        : "The selected diameter does not satisfy the allowable torsional shear-stress criterion.";
      values.shaft_recommendation = stressPasses
        ? `The selected ${selectedLabel} solid steel shaft satisfies the simplified steady-torsion requirement because its calculated maximum shear stress is ${formatDerived(actualStress, 2)} ksi, below the ${formatDerived(shaftAllowableStress, 1)} ksi allowable stress. The margin is modest, and omitted real-system effects must still be evaluated before final approval.`
        : `The selected ${selectedLabel} solid steel shaft does not satisfy the allowable torsional shear-stress criterion. Increase the diameter before evaluating the omitted real-system effects.`;
    }

    const columnLength = numericValue(values, "column_L");
    const columnUniformLoad = numericValue(values, "column_w");

    if (
      Number.isFinite(columnLength) && columnLength > 0 &&
      Number.isFinite(columnUniformLoad) && columnUniformLoad > 0
    ) {
      const optimalRatio = (Math.sqrt(2) - 1) / 2;
      const momentCoefficient = (3 - 2 * Math.sqrt(2)) / 8;
      const optimalOffset = optimalRatio * columnLength;
      const supportSpacing = columnLength - 2 * optimalOffset;
      const totalWeight = columnUniformLoad * columnLength;
      const reaction = totalWeight / 2;
      const maximumMoment = momentCoefficient * columnUniformLoad * columnLength ** 2;
      const overhangShear = columnUniformLoad * optimalOffset;
      const interiorShear = reaction - overhangShear;

      values.column_optimal_ratio = formatDerived(optimalRatio, 4);
      values.column_optimal_offset_ft = formatDerived(optimalOffset, 3);
      values.column_support_spacing_ft = formatDerived(supportSpacing, 3);
      values.column_total_weight_kip = formatDerived(totalWeight, 3);
      values.column_reaction_kip = formatDerived(reaction, 3);
      values.column_support_moment_kipft = formatDerived(-maximumMoment, 3);
      values.column_center_moment_kipft = formatDerived(maximumMoment, 3);
      values.column_max_abs_moment_kipft = formatDerived(maximumMoment, 3);
      values.column_moment_coefficient = formatDerived(momentCoefficient, 5);
      values.column_V_left_kip = formatDerived(0, 3);
      values.column_V_left_support_minus_kip = formatDerived(-overhangShear, 3);
      values.column_V_left_support_plus_kip = formatDerived(interiorShear, 3);
      values.column_V_center_kip = formatDerived(0, 3);
      values.column_V_right_support_minus_kip = formatDerived(-interiorShear, 3);
      values.column_V_right_support_plus_kip = formatDerived(overhangShear, 3);
      values.column_V_right_kip = formatDerived(0, 3);
      values.column_recommendation = `Place each support ${formatDerived(optimalOffset, 3)} ft from its nearest column end, giving a support spacing of ${formatDerived(supportSpacing, 3)} ft. This minimizes the idealized static self-weight bending moment to ${formatDerived(maximumMoment, 3)} kip-ft. Before field use, also evaluate road-induced dynamics, tie-down forces, local support bearing, concrete cracking, member orientation, and support compliance.`;
    }

    const robotOverhang = numericValue(values, "robot_a");
    const robotSupportSpacing = numericValue(values, "robot_b");
    const robotPayloadReach = numericValue(values, "robot_L");
    const robotUniformLoad = numericValue(values, "robot_w");
    const robotPayload = numericValue(values, "robot_P");
    const robotCylinderAngleDeg = numericValue(values, "robot_theta");

    if (
      Number.isFinite(robotOverhang) && robotOverhang >= 0 &&
      Number.isFinite(robotSupportSpacing) && robotSupportSpacing > 0 &&
      Number.isFinite(robotPayloadReach) && robotPayloadReach > 0 &&
      Number.isFinite(robotUniformLoad) && robotUniformLoad >= 0 &&
      Number.isFinite(robotPayload) && robotPayload >= 0 &&
      Number.isFinite(robotCylinderAngleDeg) &&
      robotCylinderAngleDeg > 0 && robotCylinderAngleDeg < 180
    ) {
      const totalLength = robotOverhang + robotSupportSpacing + robotPayloadReach;
      const supportBPosition = robotOverhang + robotSupportSpacing;
      const uniformResultant = robotUniformLoad * totalLength;
      const uniformResultantOffset = totalLength / 2 - robotOverhang;
      const reactionBy = (
        uniformResultant * uniformResultantOffset +
        robotPayload * (robotSupportSpacing + robotPayloadReach)
      ) / robotSupportSpacing;
      const angleRad = robotCylinderAngleDeg * Math.PI / 180;
      const cylinderSignedForce = reactionBy / Math.sin(angleRad);
      const cylinderForce = Math.abs(cylinderSignedForce);
      const reactionBx = cylinderSignedForce * Math.cos(angleRad);
      const reactionAx = -reactionBx;
      const reactionAy = uniformResultant + robotPayload - reactionBy;
      const momentAt = (position) => {
        let moment = -robotUniformLoad * position ** 2 / 2;
        if (position >= robotOverhang) {
          moment += reactionAy * (position - robotOverhang);
        }
        if (position >= supportBPosition) {
          moment += reactionBy * (position - supportBPosition);
        }
        return moment;
      };
      const candidates = [
        {position: 0, label: "the left free tip"},
        {position: robotOverhang, label: "pin A"},
        {position: supportBPosition, label: "cylinder attachment B"},
        {position: totalLength, label: "end C"}
      ];
      if (robotUniformLoad > 0) {
        const region2ZeroShear = reactionAy / robotUniformLoad;
        if (region2ZeroShear > robotOverhang && region2ZeroShear < supportBPosition) {
          candidates.push({
            position: region2ZeroShear,
            label: "the zero-shear point between A and B"
          });
        }
        const region3ZeroShear = (reactionAy + reactionBy) / robotUniformLoad;
        if (region3ZeroShear > supportBPosition && region3ZeroShear < totalLength) {
          candidates.push({
            position: region3ZeroShear,
            label: "the zero-shear point between B and C"
          });
        }
      }
      const governingCandidate = candidates
        .map((candidate) => ({...candidate, moment: momentAt(candidate.position)}))
        .sort((left, right) => Math.abs(right.moment) - Math.abs(left.moment))[0];
      const direction = (value, positive, negative) => value >= 0 ? positive : negative;
      const shearAMinus = -robotUniformLoad * robotOverhang;
      const shearAPlus = shearAMinus + reactionAy;
      const shearBMinus = -robotUniformLoad * supportBPosition + reactionAy;
      const shearBPlus = shearBMinus + reactionBy;
      const shearCMinus = -robotUniformLoad * totalLength + reactionAy + reactionBy;
      const shearCPlus = shearCMinus - robotPayload;

      values.robot_total_length_in = formatDerived(totalLength, 3);
      values.robot_W_lb = formatDerived(uniformResultant, 3);
      values.robot_xW_in = formatDerived(uniformResultantOffset, 3);
      values.robot_By_lb = formatDerived(reactionBy, 3);
      values.robot_F_BD_lb = formatDerived(cylinderForce, 3);
      values.robot_Bx_lb = formatDerived(reactionBx, 3);
      values.robot_cylinder_state = cylinderSignedForce >= 0 ? "compression" : "tension";
      values.robot_Ax_signed_lb = formatDerived(reactionAx, 3);
      values.robot_Ax_abs_lb = formatDerived(Math.abs(reactionAx), 3);
      values.robot_Ax_direction = direction(reactionAx, "to the right", "to the left");
      values.robot_Ay_signed_lb = formatDerived(reactionAy, 3);
      values.robot_Ay_abs_lb = formatDerived(Math.abs(reactionAy), 3);
      values.robot_Ay_direction = direction(reactionAy, "upward", "downward");
      values.robot_V_left_lb = formatDerived(0, 3);
      values.robot_V_A_minus_lb = formatDerived(shearAMinus, 3);
      values.robot_V_A_plus_lb = formatDerived(shearAPlus, 3);
      values.robot_V_B_minus_lb = formatDerived(shearBMinus, 3);
      values.robot_V_B_plus_lb = formatDerived(shearBPlus, 3);
      values.robot_V_C_minus_lb = formatDerived(shearCMinus, 3);
      values.robot_V_C_plus_lb = formatDerived(shearCPlus, 3);
      values.robot_M_A_lbin = formatDerived(momentAt(robotOverhang), 3);
      values.robot_M_B_lbin = formatDerived(momentAt(supportBPosition), 3);
      values.robot_M_C_lbin = formatDerived(momentAt(totalLength), 3);
      values.robot_M_abs_max_lbin = formatDerived(Math.abs(governingCandidate.moment), 3);
      values.robot_M_abs_max_lbft = formatDerived(Math.abs(governingCandidate.moment) / 12, 3);
      values.robot_M_signed_max_lbin = formatDerived(governingCandidate.moment, 3);
      values.robot_M_location = `${governingCandidate.label} (s = ${formatDerived(governingCandidate.position, 3)} in)`;
      values.robot_recommendation = `Check the arm section at or immediately adjacent to ${governingCandidate.label} first in the subsequent bending-stress analysis. The simplified absolute maximum moment is ${formatDerived(Math.abs(governingCandidate.moment), 3)} lb-in. Demand can be reduced by lowering payload or uniform weight, shortening the relevant reach, or relocating the cylinder attachment to improve vertical-force leverage.`;
    }

    const taperedTorque = numericValue(values, "taper_T");
    const taperedLength = numericValue(values, "taper_L");
    const taperedMinimumRadius = numericValue(values, "taper_r0");
    const taperedShearModulusGPa = numericValue(values, "taper_G");
    const taperedAllowableTwist = numericValue(values, "taper_phi_allow");

    if (
      Number.isFinite(taperedTorque) && taperedTorque > 0 &&
      Number.isFinite(taperedLength) && taperedLength > 0 &&
      Number.isFinite(taperedMinimumRadius) && taperedMinimumRadius > 0 &&
      Number.isFinite(taperedShearModulusGPa) && taperedShearModulusGPa > 0 &&
      Number.isFinite(taperedAllowableTwist) && taperedAllowableTwist > 0
    ) {
      const radiusAt = (x) => {
        const normalizedPosition = x / taperedLength;
        return taperedMinimumRadius * (
          1 + 0.8 * normalizedPosition ** 1.5 +
          0.4 * normalizedPosition ** 2.5
        );
      };
      const integrateCompliance = (end, intervals = 4000) => {
        const count = intervals % 2 === 0 ? intervals : intervals + 1;
        const step = end / count;
        const integrand = (x) => 1 / radiusAt(x) ** 4;
        let sum = integrand(0) + integrand(end);
        for (let index = 1; index < count; index += 1) {
          sum += (index % 2 === 0 ? 2 : 4) * integrand(index * step);
        }
        return sum * step / 3;
      };
      const shearModulusPa = taperedShearModulusGPa * 1e9;
      const complianceIntegral = integrateCompliance(taperedLength);
      const twistRad = 2 * taperedTorque * complianceIntegral /
        (Math.PI * shearModulusPa);
      const twistDeg = twistRad * 180 / Math.PI;
      const twistUtilization = twistDeg / taperedAllowableTwist;
      const twistPasses = twistDeg <= taperedAllowableTwist * (1 + 1e-10);
      const maximumStressMPa = 2 * taperedTorque /
        (Math.PI * taperedMinimumRadius ** 3) / 1e6;

      values.taper_reaction_Nm = formatDerived(taperedTorque, 3);
      values.taper_G_Pa = formatDerived(shearModulusPa, 0);
      values.taper_r_A_m = formatDerived(taperedMinimumRadius, 3);
      values.taper_r_L_m = formatDerived(radiusAt(taperedLength), 3);
      values.taper_J_A_m4 = formatDerived(
        Math.PI * taperedMinimumRadius ** 4 / 2, 10
      );
      values.taper_integral_m_neg3 = formatDerived(complianceIntegral, 3);
      values.taper_phi_rad = formatDerived(twistRad, 5);
      values.taper_phi_deg = formatDerived(twistDeg, 3);
      values.taper_twist_utilization = formatDerived(twistUtilization, 3);
      values.taper_twist_assessment = twistPasses
        ? "The calculated rotation satisfies the assigned torsional-stiffness limit."
        : "The calculated rotation exceeds the assigned torsional-stiffness limit.";
      values.taper_tau_max_MPa = formatDerived(maximumStressMPa, 2);
      values.taper_recommendation = twistPasses
        ? `The predicted twist is ${formatDerived(twistDeg, 3)} degrees, which satisfies the ${formatDerived(taperedAllowableTwist, 1)} degree allowable limit. The small-radius end still governs torsional compliance, so omitted strength, fatigue, dynamic, bearing, and manufacturing effects require separate evaluation.`
        : `The predicted twist is ${formatDerived(twistDeg, 3)} degrees, which exceeds the ${formatDerived(taperedAllowableTwist, 1)} degree allowable limit, so the current equivalent geometry does not satisfy the assigned stiffness criterion. The small-radius end governs torsional compliance. Increase the minimum radius or otherwise increase torsional rigidity, then re-evaluate twist. The maximum torsional shear stress is ${formatDerived(maximumStressMPa, 2)} MPa in this simplified load case, so the present problem is governed by stiffness rather than the calculated torsional stress.`;
    }

    const turbineDiameter = numericValue(values, "turbine_d");
    const turbineShearModulus = numericValue(values, "turbine_G");
    const turbineLoadedLength = numericValue(values, "turbine_L");
    const turbineLengthA = numericValue(values, "turbine_a");
    const turbineLengthB = numericValue(values, "turbine_b");
    const turbineMaxTorqueIntensity = numericValue(values, "turbine_w_max");

    if (
      Number.isFinite(turbineDiameter) && turbineDiameter > 0 &&
      Number.isFinite(turbineShearModulus) && turbineShearModulus > 0 &&
      Number.isFinite(turbineLoadedLength) && turbineLoadedLength > 0 &&
      Number.isFinite(turbineLengthA) && turbineLengthA >= 0 &&
      Number.isFinite(turbineLengthB) && turbineLengthB >= 0 &&
      Number.isFinite(turbineMaxTorqueIntensity) && turbineMaxTorqueIntensity > 0
    ) {
      const loadedLengthIn = turbineLoadedLength * 12;
      const distributedIntensityLbInPerIn = turbineMaxTorqueIntensity;
      const totalTorqueLbIn = distributedIntensityLbInPerIn * loadedLengthIn / 2;
      const totalTorqueLbFt = totalTorqueLbIn / 12;
      const polarMoment = Math.PI * turbineDiameter ** 4 / 32;
      const twistRad = distributedIntensityLbInPerIn * loadedLengthIn ** 2 /
        (3 * polarMoment * turbineShearModulus);
      const twistDeg = twistRad * 180 / Math.PI;
      const maximumStressPsi = totalTorqueLbIn * (turbineDiameter / 2) / polarMoment;

      values.turbine_total_length_ft = formatDerived(
        turbineLengthA + turbineLoadedLength + turbineLengthB, 3
      );
      values.turbine_L_in = formatDerived(loadedLengthIn, 3);
      values.turbine_total_torque_lbft = formatDerived(totalTorqueLbFt, 3);
      values.turbine_total_torque_lbin = formatDerived(totalTorqueLbIn, 1);
      values.turbine_reaction_lbft = formatDerived(totalTorqueLbFt, 3);
      values.turbine_J_in4 = formatDerived(polarMoment, 3);
      values.turbine_phi_rad = formatDerived(twistRad, 6);
      values.turbine_phi_deg = formatDerived(twistDeg, 4);
      values.turbine_tau_psi = formatDerived(maximumStressPsi, 1);
      values.turbine_tau_ksi = formatDerived(maximumStressPsi / 1000, 3);
      values.turbine_recommendation = `The corrected distributed-torque model produces a ${formatDerived(totalTorqueLbFt, 3)} lb-ft torsional reaction at C, a parabolic internal-torque distribution that decreases to zero at D, a maximum shaft shear stress of ${formatDerived(maximumStressPsi / 1000, 3)} ksi at the outer surface of section C, and a C-to-D twist of ${formatDerived(twistDeg, 4)} degrees. Under this simplified static torsion model, both values are modest. A detailed turbine-rotor assessment still requires project-specific stress and twist limits and consideration of bending, dynamic torsional vibration, thermal effects, local rotor geometry, and fatigue.`;
    }

    const gearTorqueB = numericValue(values, "gear_T_B");
    const gearTorqueC = numericValue(values, "gear_T_C");
    const gearTorqueD = numericValue(values, "gear_T_D");
    const gearTorqueF = numericValue(values, "gear_T_F");
    const gearSolidDiameter = numericValue(values, "gear_d");
    const gearOuterDiameter = numericValue(values, "gear_D_o");
    const gearAllowableStress = numericValue(values, "gear_tau_allow");
    const gearLengthAB = numericValue(values, "gear_L_AB");
    const gearLengthBC = numericValue(values, "gear_L_BC");
    const gearLengthCD = numericValue(values, "gear_L_CD");
    const gearLengthDE = numericValue(values, "gear_L_DE");
    const gearLengthEF = numericValue(values, "gear_L_EF");

    if (
      Number.isFinite(gearTorqueB) && Number.isFinite(gearTorqueC) &&
      Number.isFinite(gearTorqueD) && Number.isFinite(gearTorqueF) &&
      Number.isFinite(gearSolidDiameter) && gearSolidDiameter > 0 &&
      Number.isFinite(gearOuterDiameter) && gearOuterDiameter > 0 &&
      Number.isFinite(gearAllowableStress) && gearAllowableStress > 0 &&
      Number.isFinite(gearLengthAB) && gearLengthAB > 0 &&
      Number.isFinite(gearLengthBC) && gearLengthBC > 0 &&
      Number.isFinite(gearLengthCD) && gearLengthCD > 0 &&
      Number.isFinite(gearLengthDE) && gearLengthDE > 0 &&
      Number.isFinite(gearLengthEF) && gearLengthEF > 0
    ) {
      const torqueSum = gearTorqueB + gearTorqueC + gearTorqueD + gearTorqueF;
      const torqueTolerance = 1e-8 * Math.max(
        Math.abs(gearTorqueB), Math.abs(gearTorqueC),
        Math.abs(gearTorqueD), Math.abs(gearTorqueF), 1
      );
      const equilibriumPasses = Math.abs(torqueSum) <= torqueTolerance;
      const segmentLabels = ["AB", "BC", "CD", "DE", "EF"];
      const segmentTorques = [
        0,
        gearTorqueB,
        gearTorqueB + gearTorqueC,
        gearTorqueB + gearTorqueC + gearTorqueD,
        gearTorqueB + gearTorqueC + gearTorqueD
      ];
      const torqueMagnitudes = segmentTorques.map((torque) => Math.abs(torque));
      const segmentStresses = torqueMagnitudes.map(
        (torque) => 16 * torque * 1e6 / (Math.PI * gearSolidDiameter ** 3)
      );
      const governingTorque = Math.max(...torqueMagnitudes);
      const governingTolerance = 1e-10 * Math.max(governingTorque, 1);
      const governingSegments = segmentLabels.filter(
        (_, index) => Math.abs(torqueMagnitudes[index] - governingTorque) <= governingTolerance
      );
      const governingLabel = governingSegments.length === 1
        ? `Segment ${governingSegments[0]}`
        : `Segments ${governingSegments.slice(0, -1).join(", ")} and ${governingSegments.at(-1)}`;
      const governingTorqueNmm = governingTorque * 1e6;
      const hollowRadicand = gearOuterDiameter ** 4
        - 16 * governingTorqueNmm * gearOuterDiameter / (Math.PI * gearAllowableStress);
      const solidSectionIsFeasible = hollowRadicand >= -1e-10 * gearOuterDiameter ** 4;
      const maximumInnerDiameter = solidSectionIsFeasible
        ? Math.max(0, hollowRadicand) ** 0.25
        : 0;
      const minimumWall = (gearOuterDiameter - maximumInnerDiameter) / 2;
      const selectedWall = Math.min(
        gearOuterDiameter / 2,
        Math.ceil(minimumWall - 1e-12)
      );
      const selectedInnerDiameter = Math.max(0, gearOuterDiameter - 2 * selectedWall);
      const selectedStress = governingTorqueNmm === 0
        ? 0
        : 16 * governingTorqueNmm * gearOuterDiameter /
          (Math.PI * (gearOuterDiameter ** 4 - selectedInnerDiameter ** 4));
      const utilization = selectedStress / gearAllowableStress;
      const stressPasses = selectedStress <= gearAllowableStress * (1 + 1e-10);
      const formatSigned = (value) => value > torqueTolerance
        ? `+${formatDerived(value, 3)}`
        : formatDerived(value, 3);

      values.gear_span_AE_mm = formatDerived(
        gearLengthAB + gearLengthBC + gearLengthCD + gearLengthDE, 1
      );
      values.gear_torque_sum_kNm = formatSigned(torqueSum);
      values.gear_equilibrium_assessment = equilibriumPasses
        ? "The applied gear torques satisfy overall shaft-axis equilibrium."
        : "The applied gear torques do not satisfy overall shaft-axis equilibrium; revise at least one torque before treating the model as a valid static assignment.";
      segmentLabels.forEach((label, index) => {
        values[`gear_T_${label}_kNm`] = formatSigned(segmentTorques[index]);
        values[`gear_abs_T_${label}_kNm`] = formatDerived(torqueMagnitudes[index], 3);
        values[`gear_tau_${label}_MPa`] = formatDerived(segmentStresses[index], 3);
      });
      values.gear_governing_torque_kNm = formatDerived(governingTorque, 3);
      values.gear_governing_segments = governingLabel;
      values.gear_governing_verb = governingSegments.length === 1 ? "governs" : "govern";
      values.gear_D_i_max_mm = formatDerived(maximumInnerDiameter, 3);
      values.gear_t_min_mm = formatDerived(minimumWall, 3);
      values.gear_t_selected_mm = formatDerived(selectedWall, 3);
      values.gear_D_i_selected_mm = formatDerived(selectedInnerDiameter, 3);
      values.gear_tau_selected_MPa = formatDerived(selectedStress, 3);
      values.gear_utilization = formatDerived(utilization, 4);
      values.gear_thickness_assessment = !equilibriumPasses
        ? "The numerical stress result is provisional because the assigned external torques are not in equilibrium."
        : !solidSectionIsFeasible
          ? "Even a solid shaft with the assigned outer diameter exceeds the allowable stress; a larger outer diameter or different design criterion is required."
          : stressPasses
            ? "The selected wall thickness satisfies the allowable torsional shear-stress criterion."
            : "The selected wall thickness does not satisfy the allowable torsional shear-stress criterion.";
      values.gear_recommendation = !equilibriumPasses
        ? "Do not approve a shaft size until the applied gear torques satisfy overall shaft-axis equilibrium."
        : solidSectionIsFeasible && stressPasses
          ? `Use a hollow shaft with outer diameter ${formatDerived(gearOuterDiameter, 3)} mm and wall thickness of at least ${formatDerived(selectedWall, 3)} mm for the simplified pure-torsion model. Its calculated governing shear stress is ${formatDerived(selectedStress, 3)} MPa, or ${formatDerived(100 * utilization, 1)}% of the assigned allowable stress.`
          : "Increase the hollow-shaft outer diameter or revise the allowable-stress design before completing the omitted combined-loading and durability checks.";
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
      values.thermal_inner_diameter_in = formatDerived(innerDiameter, 2);
      values.thermal_pipe_area_in2 = formatDerived(pipeArea, 3);
      values.thermal_delta_T_F = formatDerived(temperatureChange, 0);
      values.thermal_action = temperatureChange > 0 ? "free thermal expansion" : temperatureChange < 0 ? "free thermal contraction" : "no free thermal deformation";
      values.thermal_force_state = temperatureChange > 0 ? "compression" : temperatureChange < 0 ? "tension" : "no axial load";
      values.thermal_stress_state = temperatureChange > 0 ? "compression" : temperatureChange < 0 ? "tension" : "no axial stress";
      values.thermal_free_expansion_in = formatDerived(freeDeformation, 5);
      values.thermal_free_expansion_magnitude_in = formatDerived(Math.abs(freeDeformation), 5);
      values.thermal_pipe_compliance_in_per_kip = formatDerived(pipeCompliance, 7);
      values.thermal_support_compliance_in_per_kip = formatDerived(supportCompliance, 7);
      values.thermal_total_compliance_in_per_kip = formatDerived(totalCompliance, 7);
      values.thermal_pipe_force_kip = formatDerived(pipeForce, 1);
      values.thermal_pipe_force_magnitude_kip = formatDerived(forceMagnitude, 1);
      values.thermal_pipe_elastic_deformation_in = formatDerived(forceMagnitude * pipeCompliance, 5);
      values.thermal_support_displacement_each_in = formatDerived(forceMagnitude / thermalSupportStiffness, 5);
      values.thermal_support_displacement_total_in = formatDerived(forceMagnitude * supportCompliance, 5);
      values.thermal_pipe_stress_ksi = formatDerived(pipeStress, 1);
      values.thermal_pipe_stress_magnitude_ksi = formatDerived(stressMagnitude, 1);
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
      values.platform_E_w_psi = formatDerived(modulusPsi, 0);
      values.platform_L_u_in = formatDerived(upperLengthIn, 2);
      values.platform_L_l_in = formatDerived(lowerLengthIn, 2);
      values.platform_L_DC_in = formatDerived(upperSpanIn, 2);
      values.platform_L_AB_in = formatDerived(lowerSpanIn, 2);
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
      values.platform_dominant_force_lb = formatDerived(forceEntries.find(([wire]) => wire === governingElongation[0])[1], 1);
      values.platform_dominant_length_ft = formatDerived(["AH", "BC"].includes(governingElongation[0]) ? platformLowerWireLength : platformUpperWireLength, 2);
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

    const seatLoad = numericValue(values, "seat_P");
    const seatOffset = numericValue(values, "seat_x");
    const seatOuterWidth = numericValue(values, "seat_B");
    const seatOuterHeight = numericValue(values, "seat_H");
    const seatInnerWidth = numericValue(values, "seat_b");
    const seatInnerHeight = numericValue(values, "seat_h");

    if (
      Number.isFinite(seatLoad) && seatLoad >= 0 &&
      Number.isFinite(seatOffset) && seatOffset >= 0 &&
      Number.isFinite(seatOuterWidth) && seatOuterWidth > 0 &&
      Number.isFinite(seatOuterHeight) && seatOuterHeight > 0 &&
      Number.isFinite(seatInnerWidth) && seatInnerWidth >= 0 && seatInnerWidth < seatOuterWidth &&
      Number.isFinite(seatInnerHeight) && seatInnerHeight >= 0 && seatInnerHeight < seatOuterHeight
    ) {
      const inertia = (seatOuterWidth * seatOuterHeight ** 3 - seatInnerWidth * seatInnerHeight ** 3) / 12;
      const extremeFiber = seatOuterHeight / 2;
      const moment = seatLoad * seatOffset;
      const maximumStress = moment * extremeFiber / inertia;
      values.seat_V_lb = formatDerived(seatLoad, 1);
      values.seat_M_lbin = formatDerived(moment, 1);
      values.seat_I_in4 = formatDerived(inertia, 4);
      values.seat_c_in = formatDerived(extremeFiber, 3);
      values.seat_sigma_max_psi = formatDerived(maximumStress, 1);
      values.seat_sigma_max_ksi = formatDerived(maximumStress / 1000, 3);
      values.seat_tension_fiber = "upper outer fiber";
      values.seat_compression_fiber = "lower outer fiber";
      values.seat_assessment = "The region near the fixed machine attachment is critical because the bending moment increases toward the support. A practical improvement is to increase the tube section height, increase wall thickness, or reduce the horizontal seat offset. Increasing section height is especially efficient because it places more material farther from the neutral axis.";
    }

    const hangerWeight = numericValue(values, "hanger_W");
    const hangerSide = numericValue(values, "hanger_s");
    const hangerEccentricityFt = numericValue(values, "hanger_e");

    if (
      Number.isFinite(hangerWeight) && hangerWeight >= 0 &&
      Number.isFinite(hangerSide) && hangerSide > 0 &&
      Number.isFinite(hangerEccentricityFt) && hangerEccentricityFt >= 0
    ) {
      const area = hangerSide ** 2;
      const inertia = hangerSide ** 4 / 12;
      const extremeFiber = hangerSide / 2;
      const eccentricityIn = hangerEccentricityFt * 12;
      const moment = hangerWeight * eccentricityIn;
      const directStressPsi = hangerWeight / area;
      const bendingStressPsi = moment * extremeFiber / inertia;

      values.hanger_area_in2 = formatDerived(area, 4);
      values.hanger_I_in4 = formatDerived(inertia, 6);
      values.hanger_c_in = formatDerived(extremeFiber, 3);
      values.hanger_e_in = formatDerived(eccentricityIn, 1);
      values.hanger_N_AB_lb = formatDerived(hangerWeight, 1);
      values.hanger_M_AB_lbin = formatDerived(0, 1);
      values.hanger_sigma_AB_psi = formatDerived(directStressPsi, 1);
      values.hanger_sigma_AB_ksi = formatDerived(directStressPsi / 1000, 3);
      values.hanger_N_DC_lb = formatDerived(hangerWeight, 1);
      values.hanger_M_DC_lbin = formatDerived(moment, 1);
      values.hanger_sigma_direct_ksi = formatDerived(directStressPsi / 1000, 3);
      values.hanger_sigma_bending_ksi = formatDerived(bendingStressPsi / 1000, 3);
      values.hanger_sigma_DC_max_ksi = formatDerived((directStressPsi + bendingStressPsi) / 1000, 3);
      values.hanger_sigma_DC_opp_ksi = formatDerived((directStressPsi - bendingStressPsi) / 1000, 3);
    }

    const lineF1 = numericValue(values, "line_F1");
    const lineF2 = numericValue(values, "line_F2");
    const lineF3 = numericValue(values, "line_F3");
    const lineL1 = numericValue(values, "line_L1");
    const lineL2 = numericValue(values, "line_L2");
    const lineL3 = numericValue(values, "line_L3");
    const lineL4 = numericValue(values, "line_L4");

    if (
      Number.isFinite(lineF1) && lineF1 >= 0 &&
      Number.isFinite(lineF2) && lineF2 >= 0 &&
      Number.isFinite(lineF3) && lineF3 >= 0 &&
      Number.isFinite(lineL1) && lineL1 > 0 &&
      Number.isFinite(lineL2) && lineL2 > 0 &&
      Number.isFinite(lineL3) && lineL3 > 0 &&
      Number.isFinite(lineL4) && lineL4 > 0
    ) {
      const lineX1 = lineL1;
      const lineX2 = lineL1 + lineL2;
      const lineXB = lineX2 + lineL3;
      const lineX3 = lineXB + lineL4;
      const lineBy = (lineF1 * lineX1 - lineF2 * lineX2 + lineF3 * lineX3) / lineXB;
      const lineAy = lineF1 + lineF3 - lineF2 - lineBy;
      const lineShears = [
        lineAy,
        lineAy - lineF1,
        lineAy - lineF1 + lineF2,
        lineAy - lineF1 + lineF2 + lineBy,
        lineAy - lineF1 + lineF2 + lineBy - lineF3
      ];
      const lineMoments = [
        0,
        lineShears[0] * lineL1 / 1000,
        (lineShears[0] * lineL1 + lineShears[1] * lineL2) / 1000,
        (lineShears[0] * lineL1 + lineShears[1] * lineL2 + lineShears[2] * lineL3) / 1000,
        (lineShears[0] * lineL1 + lineShears[1] * lineL2 + lineShears[2] * lineL3 + lineShears[3] * lineL4) / 1000
      ];
      const lineStations = [
        { name: "bearing A", x: 0, moment: lineMoments[0] },
        { name: "pulley 1", x: lineX1, moment: lineMoments[1] },
        { name: "center-pulley station", x: lineX2, moment: lineMoments[2] },
        { name: "bearing B", x: lineXB, moment: lineMoments[3] },
        { name: "overhung pulley 3", x: lineX3, moment: lineMoments[4] }
      ];
      const lineCritical = lineStations.reduce((current, station) =>
        Math.abs(station.moment) > Math.abs(current.moment) ? station : current
      );
      const lineDirection = (reaction) => reaction > 0 ? "upward" : reaction < 0 ? "downward" : "zero";

      values.line_Ay_N = formatDerived(Math.abs(lineAy), 2);
      values.line_Ay_direction = lineDirection(lineAy);
      values.line_By_N = formatDerived(Math.abs(lineBy), 2);
      values.line_By_direction = lineDirection(lineBy);
      lineShears.forEach((shear, index) => {
        values[`line_V${index + 1}_N`] = formatDerived(shear, 2);
      });
      values.line_MA_Nm = formatDerived(lineMoments[0], 2);
      values.line_M1_Nm = formatDerived(lineMoments[1], 2);
      values.line_M2_Nm = formatDerived(lineMoments[2], 2);
      values.line_MB_Nm = formatDerived(lineMoments[3], 2);
      values.line_M3_Nm = formatDerived(lineMoments[4], 2);
      values.line_Mmax_abs_Nm = formatDerived(Math.abs(lineCritical.moment), 2);
      values.line_Mmax_signed_Nm = formatDerived(lineCritical.moment, 2);
      values.line_Mmax_x_mm = formatDerived(lineCritical.x, 1);
      values.line_Mmax_station = lineCritical.name;
      values.line_force_check_N = formatDerived(lineShears[4], 3);
      values.line_assessment = `The ${lineCritical.name} should be checked first because it has the largest absolute bending moment, |M| = ${formatDerived(Math.abs(lineCritical.moment), 2)} N·m at x = ${formatDerived(lineCritical.x, 1)} mm from bearing A. A realistic change is to reduce the overhung distance or move bearing B closer to the overhung pulley, which reduces the pulley moment arm. Any layout change alters the bearing reactions and moment distribution, so the complete shear and bending-moment diagrams must be recalculated.`;
    }


    const beamMass = numericValue(values, "beam_m");
    const beamGravity = numericValue(values, "beam_g");
    const beamTheta = numericValue(values, "beam_theta");
    const beamBC = numericValue(values, "beam_BC");
    const beamX = numericValue(values, "beam_x");
    const beamS = numericValue(values, "beam_s");
    const beamB = numericValue(values, "beam_b");
    const beamT = numericValue(values, "beam_t");
    const beamYA = numericValue(values, "beam_yA");

    if (
      Number.isFinite(beamMass) && beamMass > 0 &&
      Number.isFinite(beamGravity) && beamGravity > 0 &&
      Number.isFinite(beamTheta) && beamTheta > 0 && beamTheta < 90 &&
      Number.isFinite(beamBC) && beamBC > 0 &&
      Number.isFinite(beamX) && beamX > 0 && beamX < beamBC &&
      Number.isFinite(beamS) && beamS >= 0 && beamX + beamS <= beamBC &&
      Number.isFinite(beamB) && beamB > 0 &&
      Number.isFinite(beamT) && beamT > 0 &&
      Number.isFinite(beamYA) && beamYA >= 0 && beamYA <= beamT / 2
    ) {
      const beamThetaRad = beamTheta * Math.PI / 180;
      const beamWeight = beamMass * beamGravity;
      const beamLengthToC = beamBC - beamX;
      const beamWorkerDistance = beamX + beamS;
      const beamWallReaction = beamWeight * beamWorkerDistance * Math.cos(beamThetaRad) /
        (beamBC * Math.sin(beamThetaRad));
      const beamReactionX = beamWallReaction;
      const beamReactionY = beamWeight;
      const beamExternalAlong = beamReactionX * Math.cos(beamThetaRad) +
        beamReactionY * Math.sin(beamThetaRad);
      const beamExternalNormal = -beamReactionX * Math.sin(beamThetaRad) +
        beamReactionY * Math.cos(beamThetaRad);
      const beamAxialForce = -beamExternalAlong;
      const beamShearForce = -beamExternalNormal;
      const beamMoment = beamX * beamExternalNormal;
      const beamArea = beamB * beamT;
      const beamInertia = beamB * beamT ** 3 / 12;
      const beamFirstMoment = beamB / 2 * ((beamT / 2) ** 2 - beamYA ** 2);
      const beamAxialStress = beamAxialForce / beamArea;
      const beamBendingStress = -beamMoment * 1000 * beamYA / beamInertia;
      const beamCombinedStress = beamAxialStress + beamBendingStress;
      const beamShearStress = beamShearForce * beamFirstMoment / (beamInertia * beamB);
      const beamMaximumShear = 1.5 * beamShearForce / beamArea;
      const beamBendingRatio = Math.abs(beamBendingStress) /
        Math.max(Math.abs(beamAxialStress), Number.EPSILON);
      const beamStressType = (stress) => stress > 1e-9 ? "tension" : stress < -1e-9 ? "compression" : "zero normal stress";
      const beamDominantResponse = Math.abs(beamBendingStress) >= Math.max(Math.abs(beamAxialStress), Math.abs(beamShearStress))
        ? "bending normal stress"
        : Math.abs(beamAxialStress) >= Math.abs(beamShearStress) ? "direct axial stress" : "transverse shear stress";

      values.beam_W_N = formatDerived(beamWeight, 1);
      values.beam_L_m = formatDerived(beamLengthToC, 3);
      values.beam_worker_distance_m = formatDerived(beamWorkerDistance, 3);
      values.beam_C_N = formatDerived(Math.abs(beamWallReaction), 1);
      values.beam_C_direction = beamWallReaction >= 0 ? "to the left" : "to the right";
      values.beam_Bx_N = formatDerived(Math.abs(beamReactionX), 1);
      values.beam_Bx_direction = beamReactionX >= 0 ? "to the right" : "to the left";
      values.beam_By_N = formatDerived(Math.abs(beamReactionY), 1);
      values.beam_By_direction = beamReactionY >= 0 ? "upward" : "downward";
      values.beam_N_N = formatDerived(beamAxialForce, 1);
      values.beam_N_type = beamStressType(beamAxialForce);
      values.beam_V_N = formatDerived(beamShearForce, 1);
      values.beam_M_Nm = formatDerived(beamMoment, 2);
      values.beam_area_mm2 = formatDerived(beamArea, 0);
      values.beam_I_mm4 = formatDerived(beamInertia, 0);
      values.beam_QA_mm3 = formatDerived(beamFirstMoment, 0);
      values.beam_sigma_axial_MPa = formatDerived(beamAxialStress, 4);
      values.beam_sigma_bending_MPa = formatDerived(beamBendingStress, 4);
      values.beam_sigma_A_MPa = formatDerived(beamCombinedStress, 4);
      values.beam_sigma_A_type = beamStressType(beamCombinedStress);
      values.beam_tau_A_MPa = formatDerived(beamShearStress, 5);
      values.beam_tau_A_abs_MPa = formatDerived(Math.abs(beamShearStress), 5);
      values.beam_tau_max_MPa = formatDerived(beamMaximumShear, 5);
      values.beam_sigma_y_MPa = formatDerived(0, 1);
      values.beam_bending_ratio = formatDerived(beamBendingRatio, 1);
      values.beam_dominant_response = beamDominantResponse;
      values.beam_assessment = `At point A, ${beamDominantResponse} governs the nominal stress state. The bending contribution is ${formatDerived(beamBendingRatio, 1)} times the direct axial contribution, while the transverse shear magnitude is ${formatDerived(Math.abs(beamShearStress), 5)} MPa. Increasing thickness t is especially effective because I is proportional to t cubed for the shown orientation; reducing the technician's perpendicular moment arm would also reduce bending. This result is not a complete access-system safety determination. Final evaluation must also address local support and connection stresses, member self-weight, lateral stability, technician motion, impact, vibration, fatigue, material allowables, deflection, and applicable workplace-access requirements.`;
    }

    return values;
  }

  function substitute(template, values) {
    return String(template || "").replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (_, key) => {
      if (key.endsWith("_unit")) {
        return unitHtml(values[key]);
      }
      return escapeHtml(values[key] ?? "");
    });
  }

  function selectedQuestions(problem, variant, type) {
    const configured = variant && Array.isArray(variant.selectedQuestions)
      ? (problem.questions || []).filter((question) => variant.selectedQuestions.includes(question.id))
      : (problem.questions || []).filter((question) => question.selected);
    const audienceKey = type === "instructor" ? "includeInInstructorPacket" : "includeInStudentPacket";
    return configured.filter((question) => question[audienceKey] !== false);
  }

  const questionSections = [
    { id: "context", title: "Context and Mechanics Reasoning Questions" },
    { id: "transition", title: "Transition to a Mechanics Model" },
    { id: "analysis", title: "Mechanics Analysis Questions" }
  ];

  function questionsBySection(questions, section) {
    return questions.filter((question) => (question.section || "analysis") === section);
  }

  function questionImagePath(problem, question) {
    if (!question.image) {
      return "";
    }
    const image = String(question.image);
    if (/^(https?:|\/)/.test(image)) {
      return image;
    }
    const problemPath = `/problems/${problem.slug}/`;
    if (window.location.pathname.includes(problemPath)) {
      return image;
    }
    return `problems/${problem.slug}/${image}`;
  }

  function problemImagePath(problem, image) {
    const source = String(image || "");
    if (!source) {
      return "";
    }
    if (/^(https?:|\/)/.test(source)) {
      return source;
    }
    const prefix = `problems/${problem.slug}/`;
    const problemPath = `/problems/${problem.slug}/`;
    if (source.startsWith(prefix) && window.location.pathname.includes(problemPath)) {
      return source.slice(prefix.length);
    }
    return source;
  }

  function renderIdealizedImage(problem) {
    const src = problemImagePath(problem, problem.idealizedImage);
    if (!src) {
      return "";
    }
    const alt = problem.idealizedImageAlt || `${problem.title} instructor reference idealization`;
    return `
      <section class="packet-reference-model">
        <h2>Instructor Reference Idealization and Input Variables</h2>
        <figure class="question-image">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">
        </figure>
      </section>
    `;
  }

  function renderVariableTable(problem, values) {
    const rows = (problem.variables || []).map((variable) => {
      const value = values[variable.key] ?? variable.value;
      return `<tr><td>${symbolHtml(variable.symbol)}</td><td>${escapeHtml(variable.label)}</td><td>${valueWithUnitHtml(value, variable.unit)}</td></tr>`;
    }).join("");
    return `
      <section class="packet-given-data">
        <h2>Given Data</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `;
  }

  function renderQuestionImage(problem, question) {
    const src = questionImagePath(problem, question);
    if (!src) {
      return "";
    }
    const alt = question.imageAlt || `${question.title} supporting image`;
    return `<figure class="question-image"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"></figure>`;
  }

  function renderLearningObjectives(question) {
    if (!Array.isArray(question.learningObjectives) || question.learningObjectives.length === 0) {
      return "";
    }
    return `<div class="learning-objectives"><h4>Learning Objectives</h4><ul>${question.learningObjectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join("")}</ul></div>`;
  }

  function renderInstructorSupport(question, values) {
    const gradingNotes = question.gradingNotes ? `<div class="support-block"><h4>Grading Notes</h4>${substitute(question.gradingNotes, values)}</div>` : "";
    const commonMistakes = question.commonMistakes ? `<div class="support-block"><h4>Common Mistakes</h4>${substitute(question.commonMistakes, values)}</div>` : "";
    return `${renderLearningObjectives(question)}${gradingNotes}${commonMistakes}`;
  }

  function renderQuestionSection(problem, questions, section, isInstructor, values, numberById) {
    const sectionQuestions = questionsBySection(questions, section.id);
    if (sectionQuestions.length === 0) {
      return "";
    }

    return `
      <section class="packet-question-section" data-question-section="${section.id}">
        <h2>${section.title}</h2>
        ${sectionQuestions.map((question) => `
          <section class="generated-question">
            <h3>${escapeHtml(question.displayNumber || numberById.get(question.id))}. ${escapeHtml(question.title)}</h3>
            ${renderQuestionImage(problem, question)}
            ${substitute(question.student, values)}
            ${isInstructor ? `<div class="answer-block"><h4>Representative Instructor Answer</h4>${substitute(question.instructor, values)}</div>${renderInstructorSupport(question, values)}` : ""}
          </section>
        `).join("")}
      </section>
    `;
  }

  function renderPacket(options) {
    const target = document.getElementById(options.targetId);
    const catalog = window.PROBLEM_CATALOG || [];
    const problem = catalog.find((item) => item.slug === options.slug || item.id === options.slug);
    if (!target || !problem) {
      return;
    }

    const variant = options.variant
      ? (problem.variants || []).find((item) => item.id === options.variant)
      : null;
    const values = variableMap(problem, variant?.variables || {});
    const isInstructor = options.type === "instructor";
    const questions = selectedQuestions(problem, variant, options.type);
    const numberById = new Map(questions.map((question, index) => [question.id, index + 1]));
    const title = isInstructor ? "Selected Questions and Answers" : "Selected Homework Questions";

    target.innerHTML = `
      <section class="generated-packet">
        <p class="packet-kicker">${escapeHtml(isInstructor ? problem.instructorDocumentTitle : problem.studentDocumentTitle)}</p>
        <h1>${title}</h1>
        ${renderQuestionSection(problem, questions, questionSections[0], isInstructor, values, numberById)}
        ${renderQuestionSection(problem, questions, questionSections[1], isInstructor, values, numberById)}
        ${renderIdealizedImage(problem)}
        ${renderVariableTable(problem, values)}
        ${renderQuestionSection(problem, questions, questionSections[2], isInstructor, values, numberById)}
      </section>`;
  }

  window.renderProblemPacket = renderPacket;
}());
