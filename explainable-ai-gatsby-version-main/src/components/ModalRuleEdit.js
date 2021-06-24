import React, { useState } from "react"

import ModalRuleEditState from "../states/ModalRuleEditState"
import RuleSelectedState from "../states/RuleSelectedState"
import RuleState from "../states/RuleState"
import ButtonsName from "../states/ButtonsName"

export default function ModalRuleEdit() {
  const visible = ModalRuleEditState(state => state.visible)
  const setVisible = ModalRuleEditState(state => state.setVisible)
  const ruleSelectedState = RuleSelectedState()
  const editRule = RuleState(state => state.editRule)
  const [ruleEdited, setRuleEdited] = useState(ruleSelectedState.ruleString)
  const setNewRuleString = RuleState(state => state.setRuleString)
  const [error, setError] = useState(false)
  return (
    <>
      {visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit rule</h3>
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
                <div className="relative p-6 flex flex-col justify-evenly">
                  <p
                    className="text-center text-red-500 font-extrabold"
                    hidden={!error}
                  >
                    The rule is not complete
                  </p>
                  <input
                    className="mt-2 border-2 border-yellow-400 rounded text-center"
                    type="text"
                    defaultValue={ruleSelectedState.ruleString}
                    onChange={e => setRuleEdited(e.target.value)}
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-yellow-300 active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => {
                      if (ruleEdited.includes("or")) {
                        setError(true)
                        return
                      }
                      editRule(
                        ruleSelectedState.actionId,
                        ruleSelectedState.ruleId,
                        ruleEdited
                      )
                      const matchDigitRegex = /\d+/g
                      try {
                        const matchedDigit = ruleEdited.match(matchDigitRegex)
                        setError(false)
                        const listOfVariablesId = []
                        for (const match of matchedDigit) {
                          listOfVariablesId.push(match)
                        }
                        setVisible({ visible: false })
                        setNewRuleString(
                          ruleSelectedState.actionId,
                          ruleSelectedState.ruleId,
                          ruleEdited
                        )
                      } catch (e) {
                        setError(true)
                      }
                    }}
                  >
                    Done
                  </button>
                  <button
                    className="bg-yellow-300 active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => setVisible({ visible: false })}
                  >
                    Cancel
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
