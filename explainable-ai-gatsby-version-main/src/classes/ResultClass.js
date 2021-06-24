/**
 * Class used to keep track of the various results for different traces with
 * the same rule or same rule and different traces.
 */
export default class ResultClass {
  /**
   *
   * @param {*} problem
   * @param {*} action
   * @param {*} variables
   * @param {*} rule
   * @param {*} hardConstraints
   * @param {*} ruleSynthetized
   * @param {*} anomalies
   */
  constructor(
    problem,
    action,
    variables,
    rule,
    hardConstraints,
    ruleSynthetized,
    anomalies
  ) {
    this.problem = problem
    this.action = action
    this.variables = variables
    this.rule = rule
    this.hardConstraints = hardConstraints
    this.ruleSynthetized = ruleSynthetized
    this.anomalies = anomalies
  }
}
