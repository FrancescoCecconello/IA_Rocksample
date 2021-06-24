import create from "zustand"

const NodePressed = create(set => ({
  nodeId: undefined,

  setStore: store => set(() => store),
}))

export default NodePressed
