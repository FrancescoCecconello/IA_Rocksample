import create from "zustand"

const RuleReady = create(set => ({
  isProblemReady: false,
  isTraceReady: false,
  isActionReady: false,
  isRuleReady: false,

  setStore: store => set(() => store),
  
  setIsProblemReady: problemReady =>
    set(() => ({
      isProblemReady: problemReady,
    })),
  setIsTraceReady: traceReady =>
    set(() => ({
      isTraceReady: traceReady,
    })),
  setActionReady: actionReady =>
    set(() => ({
      isActionReady: actionReady,
    })),
  setIsRuleReady: isRuleReady =>
    set(() => ({
      isRuleReady: isRuleReady,
    })),
}))

export default RuleReady
