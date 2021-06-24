export default class ConstraintsOfRule {
  constructor() {
    this.ruleConstraints = new Set()
  }
  addRuleConstraint(orConstraint) {
    this.ruleConstraints.add(orConstraint)
  }
}
