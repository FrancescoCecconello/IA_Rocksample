export default class Constraint {
  constructor(state, operator, variable) {
    this.state = state
    this.operator = operator
    this.variable = variable
  }
}
