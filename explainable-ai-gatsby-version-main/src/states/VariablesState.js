import create from "zustand"

const VariablesState = create(set => ({
  /**
   * Variables list of string
   */
  variables: new Set(),
  /**
   * Add a variable string to the list
   * @param {*} variableString string
   * @returns the updated variables state
   */
  addVariable: variableString =>
    set(state => {
      state.variables.add(variableString)
      return {
        variables: new Set([...state.variables]),
      }
    }),
  setStore: store => set(() => store),
  /**
   * Delete the variable in the set.
   * @param {*} variable String
   * @returns the updated variables state
   */
  deleteVariable: variable =>
    set(state => {
      state.variables.delete(variable)
      return {
        variable: new Set([...state.variables]),
      }
    }),
}))

export default VariablesState
