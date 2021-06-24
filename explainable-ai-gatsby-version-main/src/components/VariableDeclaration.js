import React, { useState } from "react"
import add from "../images/plus.png"
import ModalVariableDeclarationState from "../states/ModalVariableDeclarationState"
import VariablesState from "../states/VariablesState"

export default function VariableDeclaration() {
  const modalVariableState = ModalVariableDeclarationState()
  const variablesState = VariablesState()
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-auto mt-2 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl ">
              Variable Declaration
            </p>
          </div>
          <div className="flex items-center">
            <input
              className="w-10 h-10 disabled:opacity-50"
              type="image"
              src={add}
              alt="Add ActionSelection"
              onClick={() => modalVariableState.setVisible(true)}
              disabled={false}
            />
          </div>
        </div>
        <div className="m-3"> </div>
        <div className="flex flex-col">
          {[...variablesState.variables].map((element, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row justify-between">
                  <p>
                    {index + 1}. {element}
                  </p>
                  <button
                    className="ml-2 rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                    onClick={() => {
                      variablesState.deleteVariable(element)
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="mt-2" key={index}></div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mb-5"> </div>
    </div>
  )
}
