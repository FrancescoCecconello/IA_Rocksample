import create from "zustand"

export const RunState = create(set => ({
  run: undefined,
  setRun: run => set(() => ({ run: run })),
  setStore: store => set(() => store),
}))
