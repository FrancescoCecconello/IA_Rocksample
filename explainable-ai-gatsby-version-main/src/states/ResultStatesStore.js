import create from "zustand"

export const ResultStatesStore = create(set => ({
  problemState: new Map(),
  actionState: new Map(),
  buttonsName: new Map(),
  hardConstraint: new Map(),
  ruleSelected: new Map(),
  ruleState: new Map(),
  ruleSynthetizedState: new Map(),
  runState: new Map(),
  variableState: new Map(),
  whichAnomaly: new Map(),

  setStore : maps => set(() => {
    return {
        problemState: maps.problemState,
        actionState: maps.actionState,
        buttonsName: maps.buttonsName,
        hardConstraint: v.hardConstraint,
        ruleSelected: maps.ruleSelected,
        ruleState: maps.ruleState,
        ruleSynthetizedState: maps.ruleSynthetizedState,
        runState: maps.runState,
        variableState: maps.variableState,
        whichAnomaly: maps.whichAnomaly,
    }
  }), 

  setActionStore : actionMap => set(() => {
    return {
      actionState : actionMap
    }
  }), 


  setResultStore: args =>
    set(state => {
      state.problemState.set(args.id, args.problemState)
      state.actionState.set(args.id, args.actionState)
      state.buttonsName.set(args.id, args.buttonsName)
      state.hardConstraint.set(args.id, args.hardConstraint)
      state.ruleSelected.set(args.id, args.ruleSelected)
      state.ruleState.set(args.id, args.ruleState)
      state.ruleSynthetizedState.set(args.id, args.ruleSynthetizedState)
      state.runState.set(args.id, args.runState)
      state.variableState.set(args.id, args.variableState)
      state.whichAnomaly.set(args.id, args.whichAnomaly)

      return {
        problemState: state.problemState,
        actionState: state.actionState,
        buttonsName: state.buttonsName,
        hardConstraint: state.hardConstraint,
        ruleSelected: state.ruleSelected,
        ruleState: state.ruleState,
        ruleSynthetizedState: state.ruleSynthetizedState,
        runState: state.runState,
        variableState: state.variableState,
        whichAnomaly: state.whichAnomaly,
      }
    }),
}))
