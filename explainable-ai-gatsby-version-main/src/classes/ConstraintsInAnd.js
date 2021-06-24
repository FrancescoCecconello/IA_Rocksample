export default class constraintsInAnd {
  constructor() {
    this.andConstraints = new Set()
  }
  addAndConstraint(constraint) {
    this.andConstraints.add(constraint)
  }
}
