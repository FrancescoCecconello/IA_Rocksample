import create from "zustand"

const ActionMangament = create(set => ({
  actionToAdd: "",
  actionSelected: 0,
  actions: new Map(),
  actionCounter: 0,

  setStore: store => set(() => store),

  setActionSelected: action => set(() => ({ actionSelected: action })),

  addAction: (id, action) =>
    set(state => {
      state.actions.set(id, action)
      return {
        actions: state.actions,
      }
    }),

  setActionToAdd: action => set(() => ({ actionToAdd: action })),

  incrementActionCounter: () =>
    set(state => ({ actionCounter: state.actionCounter + 1 })),

  reset: () =>
    set(() => ({
      actionToAdd: "",
      actionSelected: 0,
      actions: new Map(),
      actionCounter: 0,
    })),

  deleteAction: id =>
    set(state => {
      state.actions.delete(id)
    }),
}))

export default ActionMangament
