import create from "zustand"

const ProblemState = create(set => ({
  problem: "",
  trace: "",
  attributes: {},

  setStore: store => set(() => store),

  setProblem: problem =>
    set(() => ({
      problem: problem,
    })),
  setTrace: trace =>
    set(() => ({
      trace: trace,
    })),
  setAttributes: attributes =>
    set(() => ({
      attributes: attributes,
    })),
}))

export default ProblemState
