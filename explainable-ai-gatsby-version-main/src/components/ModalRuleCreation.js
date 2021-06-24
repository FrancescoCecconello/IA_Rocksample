import React from "react"
import ModalRuleCreationState from "../states/ModalRuleCreationState"
import ButtonsName from "../states/ButtonsName"
import RuleState from "../states/RuleState"
import ActionMangament from "../states/ActionState"
import RuleReady from "../states/RuleReady"
import VariablesState from "../states/VariablesState"
import ProblemState from "../states/ProblemState"

export default function ModalRuleCreation() {
  const visible = ModalRuleCreationState(state => state.visible)
  const setVisible = ModalRuleCreationState(state => state.setVisible)
  const actionSelected = ActionMangament(state => state.actionSelected)
  const buttons = ButtonsName(state => state.buttonsName.get(actionSelected))
  const setConstraint = RuleState(state => state.setConstraint)
  const currentView = ButtonsName(state =>
    state.currentState.get(actionSelected)
  )
  const goToNextState = ButtonsName(state => state.goToNextState)
  const attributes = RuleState(state => state.attributes)
  const ruleReady = RuleReady()
  const variablesState = VariablesState()
  const problemState = ProblemState()

  return (
    <>
      {visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Rule creation</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setVisible({ visible: false })}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row justify-center">
                  {buttons.map((button, index) => {
                    return (
                      <button
                        key={index}
                        className="text-yellow-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all 0.9s ease" }}
                        onClick={() => {
                          if (button.name.toLowerCase() === "done") {
                            setVisible({ visible: false })
                            setConstraint({
                              view: currentView,
                              id: button.id,
                              element: button.name,
                              actionSelected: actionSelected,
                            })
                            ruleReady.setIsRuleReady(true)
                          } else {
                            setConstraint({
                              view: currentView,
                              id: button.id,
                              element: button.name,
                              actionSelected: actionSelected,
                            })
                            goToNextState(
                              actionSelected,
                              problemState.attributes,
                              [...variablesState.variables],
                              button
                            )
                            ruleReady.setIsRuleReady(false)
                          }
                        }}
                      >
                        {button.name}
                      </button>
                    )
                  })}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-yellow-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => setVisible({ visible: false })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
