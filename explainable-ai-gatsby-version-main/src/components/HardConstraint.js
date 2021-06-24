import React, { useEffect, useState } from "react"
import add from "../images/plus.png"
import ModalHardConstraintState from "../states/ModalHardConstraintState"
import HardConstraintState from "../states/HardConstraintState"
import VariablesState from "../states/VariablesState"

export default function HardConstraint() {
  const modalState = ModalHardConstraintState()
  const hardConstraint = HardConstraintState()
  const variables = VariablesState().variables
  const isButtonDisabled = variables.size > 0 ? false : true

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-auto mt-2 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl ">
              Hard Constraint
            </p>
          </div>
          <div className="flex items-center">
            <input
              className="w-10 h-10 disabled:opacity-50"
              type="image"
              src={add}
              alt="Add ActionSelection"
              onClick={() => modalState.setVisible(true)}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
        <div className="m-3"> </div>
        {/**
         * body
         */}
        <div className="flex flex-col">
          {[...hardConstraint.hardConstraints].map((element, index) => {
            return (
              <div className="flex w-auto h-auto justify-between items-center">
                <div>
                  <p>
                    {index + 1}. {element.toString()}
                  </p>
                </div>
                <div>
                  <button
                    className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                    onClick={() => {
                      hardConstraint.removeHardConstraint(element)
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mb-5"> </div>
      </div>
    </div>
  )
}
