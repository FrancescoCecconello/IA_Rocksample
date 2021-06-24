/**
 * Class used to keep track of the problem attributes
 */
export default class ProblemClass {
  /**
   *
   * @param {*} name
   * @param {*} trace
   * @param {*} attributes
   */
  constructor(name, trace, attributes) {
    this.name = name
    this.trace = trace
    this.attributes = attributes
  }
}
