export default class HardConstraintClass {
  constructor(variable, operator, term) {
    this.variable = variable
    this.operator = operator
    this.term = term
  }
  toString() {
    return this.variable + " " + this.operator + " " + this.term
  }
}
