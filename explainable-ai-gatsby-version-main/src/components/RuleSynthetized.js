import React from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import ActionMangament from "../states/ActionState"

export default function RuleSynthetized() {
  const rule = RuleSynthetizedState()
  const actionSelected = ActionMangament(state => state.actionSelected)

  const getActionById = id => {
    for (const tmpRule of rule.rule.rule) {
      if (tmpRule.action === undefined) return undefined
      if (tmpRule.action.id === id) {
        return tmpRule
      }
    }
    return undefined
  }
  return (
    <div className="flex-wrap border-2 rounded-lg shadow-lg w-96 h-auto m-5 p-5 text-lg">
      <p className="text-left font-bold text-2xl"> Rule synthetized:</p>
      <div className="mt-5"></div>
      {((getActionById(actionSelected) || {}).constraints || []).map(
        (andConstraints, index) => {
          let stringRule = "" + (index + 1) + ". "
          for (const [index, constraint] of andConstraints.entries()) {
            if (index > 0) {
              stringRule += " and "
            }
            stringRule +=
              constraint.state +
              " " +
              constraint.operator +
              " " +
              constraint.value.toFixed(2)
          }
          return <p key={index}>{stringRule}</p>
        }
      )}
      <div className="m-3"></div>
      <div className="mb-5"></div>
    </div>
  )
}
