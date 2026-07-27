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

  function substitute(template, values) {
    return String(template || "").replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (_, key) => {
      if (key.endsWith("_unit")) {
        return unitHtml(values[key]);
      }
      return escapeHtml(values[key] ?? "");
    });
  }

  function selectedQuestions(problem, variant) {
    if (variant && Array.isArray(variant.selectedQuestions)) {
      return (problem.questions || []).filter((question) => variant.selectedQuestions.includes(question.id));
    }
    return (problem.questions || []).filter((question) => question.selected);
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
    const questions = selectedQuestions(problem, variant);
    const title = isInstructor ? "Selected Questions and Answers" : "Selected Homework Questions";

    target.innerHTML = `
      <section class="generated-packet">
        <p class="packet-kicker">${escapeHtml(isInstructor ? problem.instructorDocumentTitle : problem.studentDocumentTitle)}</p>
        <h1>${title}</h1>
        ${questions.map((question, index) => `
          <section class="generated-question">
            <h2>${index + 1}. ${escapeHtml(question.title)}</h2>
            <p class="question-meta">${[question.type, question.difficulty, ...(question.tags || [])].filter(Boolean).map(escapeHtml).join(" · ")}</p>
            ${renderQuestionImage(problem, question)}
            ${substitute(question.student, values)}
            ${isInstructor ? `<div class="answer-block"><h3>Representative Instructor Answer</h3>${substitute(question.instructor, values)}</div>${renderInstructorSupport(question, values)}` : ""}
          </section>
        `).join("")}
      </section>`;
  }

  window.renderProblemPacket = renderPacket;
}());
