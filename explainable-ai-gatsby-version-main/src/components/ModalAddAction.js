import React from "react"
import ModalActionSelectionState from "../states/ModalActionSelectionState"
import DropdownActionChoose from "./DropdownActionChoose"
import ActionMangament from "../states/ActionState"
import RuleState from "../states/RuleState"
import ButtonsName from "../states/ButtonsName"
import RuleReady from "../states/RuleReady"
import ActionState from "../states/ActionState"
import ProblemState from "../states/ProblemState"

export default function ModalAddAction() {
  const visible = ModalActionSelectionState(state => state.visible)
  const setVisible = ModalActionSelectionState(state => state.setVisible)
  const ruleReady = RuleReady()
  const actionState = ActionMangament()
  const buttonsName = ButtonsName()
  const ruleState = RuleState()
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
                  <h3 className="text-3xl font-semibold">Add Action</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setVisible({ visible: false })}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <DropdownActionChoose></DropdownActionChoose>
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
                  <button
                    className="bg-yellow-300 active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => {
                      setVisible({ visible: false })
                      actionState.addAction(
                        actionState.actionCounter,
                        actionState.actionToAdd
                      )
                      actionState.incrementActionCounter()
                      actionState.setActionSelected(actionState.actionCounter)
                      ruleState.addRule(actionState.actionCounter)
                      buttonsName.addButtons(
                        actionState.actionCounter,
                        problemState.attributes
                      )
                      ruleReady.setActionReady(true)
                    }}
                  >
                    Add Action
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
