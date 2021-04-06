import BlockComponent from './abstract/BlockComponent';

export default class Feedback extends BlockComponent {
  static componentType = "feedback";

  static primaryStateVariableForDefinition = "feedbackText";

  static get stateVariablesShadowedForReference() {
    return ["hide"]
  }

  static createAttributesObject(args) {
    let attributes = super.createAttributesObject(args);
    delete attributes.hide;
    attributes.condition = {
      createComponentOfType: "condition"
    }

    return attributes;
  }

  static returnChildLogic(args) {
    let childLogic = super.returnChildLogic(args);

    childLogic.newLeaf({
      name: "atLeastZeroAnything",
      componentType: '_base',
      comparison: 'atLeast',
      number: 0,
      setAsBase: true,
    });

    return childLogic;
  }

  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.hide = {
      forRenderer: true,
      returnDependencies: () => ({
        condition: {
          dependencyType: "attributeComponent",
          attributeName: "condition",
          variableNames: ["value"],
        },
      }),
      definition: function ({ dependencyValues }) {

        let hide;
        if (dependencyValues.condition === null) {
          hide = false;
        } else {
          hide = !dependencyValues.condition.stateValues.value;
        }

        return { newValues: { hide } }
      }
    };

    // for case when created from a copy prop
    stateVariableDefinitions.feedbackText = {
      forRenderer: true,
      defaultValue: null,
      returnDependencies: () => ({}),
      definition: () => ({
        useEssentialOrDefaultValue: {
          feedbackText: { variablesToCheck: ["feedbackText"] }
        }
      })
    }

    stateVariableDefinitions.childrenToRender = {
      returnDependencies: () => ({
        children: {
          dependencyType: "child",
          childLogicName: "atLeastZeroAnything"
        }
      }),
      definition: function ({ dependencyValues }) {
        return {
          newValues: {
            childrenToRender: dependencyValues.children.map(x => x.componentName)
          }
        }
      }
    }


    return stateVariableDefinitions;
  }

}
