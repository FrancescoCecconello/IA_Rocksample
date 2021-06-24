import create from "zustand"

import VIEWS from "../util/VIEWS"
import logicConnector from "../util/LOGIC_CONNECTORS"

const STATE_MAPPING = {
  tigerright: "tiger right",
  tigerleft: "tiger left",
}
/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  constraints: new Map(),
  logicConnector: new Map(),
  tempConstraint: new Map(),
  ruleString: new Map(),
  subRuleCounter: new Map(),
  ruleIdCounter: new Map(),

  setStore: store => set(() => store),
  addRule: actionId =>
    set(state => {
      state.constraints.set(actionId, new Map())
      state.logicConnector.set(actionId, logicConnector.OR)
      state.tempConstraint.set(actionId, {})
      state.ruleString.set(actionId, new Map())
      state.subRuleCounter.set(actionId, 0)
      state.ruleIdCounter.set(actionId, 0)

      return {
        constraints: state.constraints,
        ruleString: state.ruleString,
      }
    }),

  resetRuleState: () =>
    set(() => ({
      constraints: new Map(),
      logicConnector: new Map(),
      tempConstraint: new Map(),
      ruleString: new Map(),
      subRuleCounter: new Map(),
    })),

  setRuleString: (actionId, ruleId, newRuleString) =>
    set(state => {
      state.ruleString.get(actionId).set(ruleId, newRuleString)
      return {
        ruleString: state.ruleString,
      }
    }),

  removeConstraint: actionId =>
    set(state => {
      state.constraints.delete(actionId)
      state.ruleString.delete(actionId)
      state.logicConnector.delete(actionId)
      state.tempConstraint.delete(actionId)
      state.subRuleCounter.delete(actionId)
    }),

  removeSubRule: (actionId, ruleId) =>
    set(state => {
      state.constraints.get(actionId).delete(ruleId)
      state.ruleString.get(actionId).delete(ruleId)
      //may not work, check it out later.
      if (ruleId === state.ruleString.get(actionId).size - 1) {
        state.tempConstraint.set(actionId, {})
        state.logicConnector.set(actionId, logicConnector.OR)
      }
    }),

  editRule: (actionId, ruleId, ruleString) =>
    set(state => {
      const REGEX = /(tigerleft|tigerright){1}(<|>|<=|>=){1}([a-z][0-9]+){1}(and){0,1}/g
      const matches = [...ruleString.split(" ").join("").matchAll(REGEX)]
      //the rule inserted is not correct.
      if (matches.length === 0) {
        //TODO: ADD AN ERROR MESSAGE HERE
        return
      }
      const subRulesInAnd = []
      for (const [index, match] of matches.entries()) {
        const subRule = {
          state: STATE_MAPPING[match[1]],
          operator: match[2],
          variable: match[3],
        }
        subRulesInAnd.push(subRule)
      }
      state.constraints.get(actionId).set(ruleId, subRulesInAnd)
    }),

  setConstraint: args =>
    set(state => {
      const ruleId = state.ruleIdCounter.get(args.actionSelected)
      switch (+args.view) {
        case VIEWS.STATE_BELIEF: {
          //Edit rule String.
          if (
            state.logicConnector.get(args.actionSelected) === logicConnector.OR
          ) {
            state.ruleString.get(args.actionSelected).set(ruleId, args.element)
          } else {
            if (state.ruleString.get(args.actionSelected).size === 0) {
              state.ruleString.get(args.actionSelected).set(ruleId, "")
            }
            let tempRuleString = state.ruleString
              .get(args.actionSelected)
              .get(ruleId)
            tempRuleString += " " + args.element
            state.ruleString
              .get(args.actionSelected)
              .set(ruleId, tempRuleString)
          }
          state.tempConstraint.get(args.actionSelected)["state"] = args.element
          return {
            ruleString: state.ruleString,
            tempConstraint: state.tempConstraint,
          }
        }
        case VIEWS.OPERATOR: {
          let rule = state.ruleString.get(args.actionSelected).get(ruleId)
          rule += " " + args.element
          state.ruleString.get(args.actionSelected).set(ruleId, rule)
          state.tempConstraint.get(args.actionSelected)["operator"] =
            args.element
          return {
            ruleString: state.ruleString,
            tempConstraint: state.tempConstraint,
          }
        }
        case VIEWS.VARIABLE: {
          let rule = state.ruleString.get(args.actionSelected).get(ruleId)
          rule += " " + args.element
          state.ruleString.get(args.actionSelected).set(ruleId, rule)
          state.tempConstraint.get(args.actionSelected)["variable"] =
            args.element
          return {
            ruleString: state.ruleString,
            tempConstraint: state.tempConstraint,
          }
        }
        case VIEWS.LOGIC_CONNECTOR: {
          if (args.element.toLowerCase() === "and") {
            let rule = state.ruleString.get(args.actionSelected).get(ruleId)
            rule += " " + args.element.toLowerCase()
            state.ruleString.get(args.actionSelected).set(ruleId, rule)
          } else if (args.element.toLowerCase() === "or") {
            state.ruleIdCounter.set(args.actionSelected, ruleId + 1)
          }
          switch (state.logicConnector.get(args.actionSelected)) {
            case logicConnector.OR:
              //no need to add the constraint, in case
              state.constraints
                .get(args.actionSelected)
                .set(ruleId, [state.tempConstraint.get(args.actionSelected)])
              break
            case logicConnector.AND:
              const subRule = state.constraints
                .get(args.actionSelected)
                .get(ruleId)
              subRule.push(state.tempConstraint.get(args.actionSelected))
              state.constraints.get(args.actionSelected).set(ruleId, subRule)
              break
            case logicConnector.DONE:
              const logic =
                args.element.toLowerCase() === "and"
                  ? logicConnector.AND
                  : args.element.toLowerCase() === "or"
                  ? logicConnector.OR
                  : logicConnector.DONE
              state.logicConnector.set(args.actionSelected, logic)
              return {
                logicConnector: state.logicConnector,
              }
            default:
              console.error("Logic connector is not matching any case")
              break
          }
          const logic =
            args.element.toLowerCase() === "and"
              ? logicConnector.AND
              : args.element.toLowerCase() === "or"
              ? logicConnector.OR
              : logicConnector.DONE

          state.logicConnector.set(args.actionSelected, logic)
          state.tempConstraint.set(args.actionSelected, {})

          return {
            ruleString: state.ruleString,
            constraints: state.constraints,
            tempConstraint: state.tempConstraint,
            logicConnector: state.logicConnector,
            ruleIdCounter: state.ruleIdCounter,
          }
        }
        default:
          console.error("View is not matching any case")
      }
    }),
}))

export default RuleState
