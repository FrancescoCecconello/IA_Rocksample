/**
 * Class used to store the list of anomalies
 */
export default class AnomaliesListClass {
  /**
   *
   * @param {*} listAnomaliesSameAction list
   * @param {*} listAnomaliesDifferentAction list
   */
  constructor(listAnomaliesSameAction, listAnomaliesDifferentAction) {
    this.listAnomaliesSameAction = listAnomaliesSameAction
    this.listAnomaliesDifferentAction = listAnomaliesDifferentAction
  }
}
