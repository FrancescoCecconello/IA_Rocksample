import React, { useEffect, useState } from "react"
import ButtonsForHardConstraintModal from "../states/ButtonsForHardConstraintModal"
import ModalHardConstraintState from "../states/ModalHardConstraintState"
import VariablesState from "../states/VariablesState"
import { HARD_CONSTRAINT_STATE_CYCLE } from "../util/HARD_CONSTRAINT_CYCLE"
import HardConstraintState from "../states/HardConstraintState"

export default function ModalHardConstraints() {
  const modalState = ModalHardConstraintState()
  const buttons = ButtonsForHardConstraintModal()
  const variables = VariablesState().variables
  const hardConstraints = HardConstraintState()
  const [input, setInput] = useState(false)
  const [inputRangeError, setInputRangeError] = useState(false)
  /**
   * Force the update of the buttons array in case is in the right state.
   */
  useEffect(() => {
    buttons.setVariables(variables)
  }, [variables])

  const Input = () => {
    return (
      <div className="flex flex-col justify-center">
        <p className="bg-yellow-300 rounded" hidden={!inputRangeError}>
          Insert a value between 0.0 and 1.0
        </p>
        <input
          type="number"
          id="number"
          min="0"
          max="1"
          step="0.01"
          className="mt-3 border-2 rounded border-black"
        ></input>
      </div>
    )
  }
  const Buttons = () => {
    return buttons.buttonsName.map((element, index) => {
      return (
        <button
          key={index}
          className="text-yellow-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all 0.9s ease" }}
          onClick={() => {
            if (
              buttons.currentState === HARD_CONSTRAINT_STATE_CYCLE.CHOICE &&
              element.toLowerCase() === "value"
            ) {
              setInput(true)
            } else {
              setInput(false)
            }
            buttons.goToNextState(element, variables)
            if (
              buttons.currentState === HARD_CONSTRAINT_STATE_CYCLE.VARIABLES
            ) {
              hardConstraints.addHardConstraint(buttons.tempConstraint)
              buttons.resetTempConstraint()
            }
          }}
        >
          {element}
        </button>
      )
    })
  }

  return (
    <>
      {modalState.visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Hard constraint</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => modalState.setVisible(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row justify-center">
                  {input ? <Input></Input> : <Buttons></Buttons>}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-yellow-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => modalState.setVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const value = document.getElementById("number").value
                      if (value < 0.0 || value > 1.0) {
                        setInputRangeError(true)
                        return
                      } else {
                        setInputRangeError(false)
                      }
                      buttons.goToNextState(parseFloat(value), variables)

                      hardConstraints.addHardConstraint(buttons.tempConstraint)
                      buttons.resetTempConstraint()
                      setInput(false)
                    }}
                    className="text-yellow-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    hidden={!input}
                  >
                    Done
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
