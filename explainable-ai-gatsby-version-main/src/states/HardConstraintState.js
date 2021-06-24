import create from "zustand"

const HardConstraint = create(set => ({
  /**
   * Set of HardConstraints
   */
  hardConstraints: new Set(),
  setStore: store => set(() => store),
  /**
   * Add an hard constraint to the list.
   * @param {*} constraint new object of the class HardConstranintClass
   * @returns updated states
   */
  addHardConstraint: constraint =>
    set(state => {
      state.hardConstraints.add(constraint)
      return {
        hardConstraints: state.hardConstraints,
      }
    }),
  /**
   * Remove an hardconstraint from the list
   * @param {*} constraint new object of the class HardConstranintClass
   * @returns
   */
  removeHardConstraint: constraint =>
    set(state => {
      state.hardConstraints.delete(constraint)
      return {
        hardConstraints: state.hardConstraints,
      }
    }),
}))

export default HardConstraint
