import create from "zustand"

export const ResultStateCounter = create(set => ({
  counter: 1,
  selected: 0,
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  setSelected: num => set(() => ({ selected: num })),
}))
