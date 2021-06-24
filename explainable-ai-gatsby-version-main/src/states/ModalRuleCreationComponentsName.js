import create from "zustand"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const ModalRuleCreationComponentsName = create(set => ({
  buttonsName: [],
  setButtonsName: names => set(() => ({ buttonsName: names }))
}))

export default ModalRuleCreationComponentsName