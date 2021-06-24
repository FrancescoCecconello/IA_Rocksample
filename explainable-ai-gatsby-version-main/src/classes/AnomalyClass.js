export default class AnomalyClass {
  /**
   *
   * @param {*} run
   * @param {*} step
   * @param {*} action
   * @param {*} beliefs
   * @param {*} severity
   */
  constructor(run, step, action, beliefs, severity) {
    this.run = run
    this.step = step
    this.action = action
    this.beliefs = beliefs
    this.severity = severity
  }
}
