import create from "zustand"

const ModalVariableDeclarationState = create(set => ({
  visible: false,
  setVisible: visible => set(() => ({ visible: visible })),
}))

export default ModalVariableDeclarationState
