import React from "react"
import add from "../images/plus.png"
import ModalActionSelectionState from "../states/ModalActionSelectionState"
import ActionMangament from "../states/ActionState"
import RuleReady from "../states/RuleReady"
import RuleState from "../states/RuleState"
import ButtonsName from "../states/ButtonsName"
import RuleSynthetizedState from "../states/RuleSynthetizedState"

export default function ActionSelection() {
  const setModalActionVisible = ModalActionSelectionState(
    state => state.setVisible
  )
  const ruleReady = RuleReady()
  const isDisabled = !(ruleReady.isProblemReady && ruleReady.isTraceReady)
  const actionState = ActionMangament()
  const removeConstraint = RuleState(state => state.removeConstraint)
  const buttonsName = ButtonsName()
  const ruleSynthetized = RuleSynthetizedState()

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 mt-2 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl ">
              Template selection:
            </p>
          </div>
          <div>
            <input
              className="w-9 h-9 disabled:opacity-50"
              type="image"
              src={add}
              alt="Add a new action"
              onClick={() =>
                setModalActionVisible({
                  visible: true,
                })
              }
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="m-3"> </div>
        {[...actionState.actions.keys()].map((key, index) => {
          const style =
            actionState.actionSelected == key
              ? "font-semibold rounded-lg p-3 yellow-color"
              : "font-semibold rounded-lg p-3 bg-yellow-100"
          return (
            <div key={key}>
              <div
                key={key}
                className="flex w-auto h-auto justify-between items-center"
              >
                <button
                  className={style}
                  onClick={() => {
                    actionState.setActionSelected(key)
                  }}
                >
                  {actionState.actions.get(key)}
                </button>
                <button
                  className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                  onClick={() => {
                    actionState.deleteAction(key)
                    removeConstraint(key)
                    buttonsName.resetButtonsHavingSpecificId(key)
                    ruleSynthetized.deleteConstraints(key)
                    if (actionState.actions.size === 0) {
                      buttonsName.resetButtonsName()
                      ruleReady.setActionReady(false)
                      return
                    }
                  }}
                >
                  X
                </button>
              </div>
              <div key={"second div" + index} className="mt-3"></div>
            </div>
          )
        })}
      </div>
      <div className="mb-5"> </div>
    </div>
  )
}
