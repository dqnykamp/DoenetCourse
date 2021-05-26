import { convertAttributesForComponentType } from '../utils/copy';
import { processAssignNames } from '../utils/serializedStateProcessing';
import SampleRandomNumbers from './SampleRandomNumbers';

export default class SelectRandomNumbers extends SampleRandomNumbers {
  static componentType = "selectRandomNumbers";

  static createsVariants = true;

  static createAttributesObject(args) {
    let attributes = super.createAttributesObject(args);

    delete attributes.numberOfSamples;

    attributes.numberToSelect = {
      createComponentOfType: "number",
      createStateVariable: "numberToSelect",
      defaultValue: 1,
      public: true,
    }

    return attributes;
  }

  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.variants = {
      returnDependencies: () => ({
        variants: {
          dependencyType: "variants",
        },
      }),
      definition: function ({ dependencyValues }) {
        return { newValues: { variants: dependencyValues.variants } };
      },
    };


    stateVariableDefinitions.step.immutable = true;
    stateVariableDefinitions.from.immutable = true;
    stateVariableDefinitions.from.additionalStateVariablesDefined[0].immutable=true;
    stateVariableDefinitions.from.additionalStateVariablesDefined[1].immutable=true;

    stateVariableDefinitions.mean.immutable = true;
    stateVariableDefinitions.variance.immutable = true;
    stateVariableDefinitions.standardDeviation.immutable = true;
    

    delete stateVariableDefinitions.sampledValues;

    stateVariableDefinitions.selectedValues = {
      immutable: true,
      returnDependencies: ({ sharedParameters }) => ({
        numberToSelect: {
          dependencyType: "stateVariable",
          variableName: "numberToSelect",
        },
        type: {
          dependencyType: "stateVariable",
          variableName: "type"
        },
        from: {
          dependencyType: "stateVariable",
          variableName: "from"
        },
        to: {
          dependencyType: "stateVariable",
          variableName: "to"
        },
        step: {
          dependencyType: "stateVariable",
          variableName: "step"
        },
        nDiscreteValues: {
          dependencyType: "stateVariable",
          variableName: "nDiscreteValues"
        },
        mean: {
          dependencyType: "stateVariable",
          variableName: "mean"
        },
        standardDeviation: {
          dependencyType: "stateVariable",
          variableName: "standardDeviation"
        },
        variants: {
          dependencyType: "stateVariable",
          variableName: "variants"
        },
        selectRng: {
          dependencyType: "value",
          value: sharedParameters.selectRng,
          doNotProxy: true,
        },


      }),
      definition({ dependencyValues }) {
        if (dependencyValues.numberToSelect < 1) {
          return {
            makeEssential: { selectedValues: true },
            newValues: {
              selectedValues: [],
            }
          }
        }

        if (dependencyValues.variants && dependencyValues.variants.desiredVariant) {
          let desiredValues = dependencyValues.variants.desiredVariant.values;
          if (desiredValues) {
            if (desiredValues.length !== dependencyValues.numberToSelect) {
              throw Error("Number of values specified for selectRandomNumber must match number to select");
            }

            // just give the desired values without any verification
            return {
              makeEssential: { selectedValues: true },
              newValues: {
                selectedValues: desiredValues,
              }
            }

          }
        }

        if (dependencyValues.type === "gaussian") {

          if (!(dependencyValues.standardDeviation >= 0) || !Number.isFinite(dependencyValues.mean)) {
            let message = "Invalid mean (" + dependencyValues.mean
              + ") or standard deviation (" + dependencyValues.standardDeviation
              + ") for a gaussian random variable.";
            console.warn(message);

            return {
              makeEssential: { selectedValues: true },
              newValues: {
                selectedValues: Array(dependencyValues.numberToSelect).fill(NaN),
              }
            }
          }

          let selectedValues = [];

          for (let i = 0; i < dependencyValues.numberToSelect; i++) {
            // Standard Normal variate using Box-Muller transform.
            let u = 0, v = 0;
            while (u === 0) {
              u = dependencyValues.selectRng();
            }
            while (v === 0) {
              v = dependencyValues.selectRng();
            }
            let standardNormal = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

            // transform to correct parameters
            selectedValues.push(dependencyValues.mean + dependencyValues.standardDeviation * standardNormal);

          }

          return {
            makeEssential: { selectedValues: true },
            newValues: {
              selectedValues,
            }
          }

        } else if (dependencyValues.type === "uniform") {

          let selectedValues = [];

          let diff = dependencyValues.to - dependencyValues.from

          for (let i = 0; i < dependencyValues.numberToSelect; i++) {
            selectedValues.push(dependencyValues.from + dependencyValues.selectRng() * diff);
          }

          return {
            makeEssential: { selectedValues: true },
            newValues: {
              selectedValues,
            }
          }

        } else {
          // discreteuniform
          let selectedValues = [];

          if (dependencyValues.nDiscreteValues > 0) {
            for (let i = 0; i < dependencyValues.numberToSelect; i++) {
              // random integer from 0 to nDiscreteValues-1
              let ind = Math.floor(dependencyValues.selectRng() * dependencyValues.nDiscreteValues);

              selectedValues.push(dependencyValues.from + dependencyValues.step * ind)

            }
          }

          return {
            makeEssential: { selectedValues: true },
            newValues: {
              selectedValues,
            }
          }

        }
      }
    }

    stateVariableDefinitions.isVariantComponent = {
      returnDependencies: () => ({}),
      definition: () => ({ newValues: { isVariantComponent: true } })
    }

    stateVariableDefinitions.generatedVariantInfo = {
      returnDependencies: () => ({
        selectedValues: {
          dependencyType: "stateVariable",
          variableName: "selectedValues"
        },
      }),
      definition({ dependencyValues }) {

        let generatedVariantInfo = {
          values: dependencyValues.selectedValues
        };

        return { newValues: { generatedVariantInfo } }

      }
    }

    stateVariableDefinitions.readyToExpandWhenResolved = {

      returnDependencies: () => ({
        selectedValues: {
          dependencyType: "stateVariable",
          variableName: "selectedValues",
        },
      }),
      definition: function () {
        return { newValues: { readyToExpandWhenResolved: true } };
      },
    };

    return stateVariableDefinitions;

  }




  static createSerializedReplacements({ component, componentInfoObjects }) {



    let attributesToConvert = {};
    for (let attr of ["displayDigits", "displaySmallAsZero", "displayDecimals"]) {
      if (attr in component.attributes) {
        attributesToConvert[attr] = component.attributes[attr]
      }
    }



    let replacements = [];

    for (let value of component.stateValues.selectedValues) {
      let attributesFromComposite = {};

      if (Object.keys(attributesToConvert).length > 0) {
        attributesFromComposite = convertAttributesForComponentType({
          attributes: attributesToConvert,
          componentType: "number",
          componentInfoObjects,
          compositeCreatesNewNamespace: component.attributes.newNamespace
        })
      }

      replacements.push({
        componentType: "number",
        attributes: attributesFromComposite,
        state: { value }
      });
    }

    let processResult = processAssignNames({
      assignNames: component.doenetAttributes.assignNames,
      serializedComponents: replacements,
      parentName: component.componentName,
      parentCreatesNewNamespace: component.attributes.newNamespace,
      componentInfoObjects,
    });

    return { replacements: processResult.serializedComponents };


  }


}

delete SelectRandomNumbers.stateVariableToEvaluateAfterReplacements;
delete SelectRandomNumbers.calculateReplacementChanges;