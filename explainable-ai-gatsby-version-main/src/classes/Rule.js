/**
 * Class used to keep track the single rule
 */
export default class Rule {
  /**
   *
   * @param {*} id, id referred to the action in ordered list
   * @param {*} listOfRules list of constraints
   */
  constructor(id, listOfRules) {
    this.id = id
    this.listOfRules = listOfRules
  }
}
