import create from "zustand"

const ModalHardConstraintState = create(set => ({
  visible: false,
  setVisible: visible => set(() => ({ visible: visible })),
}))

export default ModalHardConstraintState
