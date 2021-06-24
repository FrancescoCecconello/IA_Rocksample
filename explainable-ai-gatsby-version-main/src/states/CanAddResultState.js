import create from "zustand"

export const CanAddResultState = create(set => ({
  bool: false,
  setBool: bool => set(() => ({ bool: bool })),
}))
