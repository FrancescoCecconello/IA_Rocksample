export default class ConstraintsInOr {
  constructor() {
    this.orConstraints = new Set()
  }
  addOrConstraint(constraint) {
    this.orConstraints.add(constraint)
  }
}
