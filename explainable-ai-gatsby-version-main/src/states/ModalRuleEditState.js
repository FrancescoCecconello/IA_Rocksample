import create from "zustand"

const ModalRuleEditState = create(set => ({
  visible: false,
  setVisible: stateVisible => set(() => ({ visible: stateVisible.visible }))
}))

export default ModalRuleEditState