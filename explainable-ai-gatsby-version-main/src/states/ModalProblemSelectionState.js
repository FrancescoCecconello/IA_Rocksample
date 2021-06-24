import create from "zustand"

/**
 * State for ModalProblem component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
const ModalProblemSelection = create(set => ({
  visible: false,
  isProblemSelected: false,
  setIsProblemSelected: problemSelected => set(() => ({ isProblemSelected: problemSelected })),
  setVisible: stateVisible => set(() => ({ visible: stateVisible.visible }))

}))

export default ModalProblemSelection