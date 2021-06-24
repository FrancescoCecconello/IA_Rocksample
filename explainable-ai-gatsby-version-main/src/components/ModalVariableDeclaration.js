import React, { useState } from "react"
import ModalVariableDeclarationState from "../states/ModalVariableDeclarationState"
import VariablesState from "../states/VariablesState"

export default function ModalVariableDeclaration() {
  const modalState = ModalVariableDeclarationState()
  const [variableToAdd, setVariableToAdd] = useState("")
  const variablesState = VariablesState()
  const [error, setError] = useState(false)

  return (
    <>
      {modalState.visible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Variable Declaration
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => modalState.setVisible(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col justify-center">
                  <p
                    className="text-center text-red-500 font-extrabold"
                    hidden={!error}
                  >
                    Variable already present
                  </p>
                  <input
                    className="mt-2 self-center border-2 border-yellow-400 w-64 rounded text-center"
                    type="text"
                    placeholder={"insert variable name"}
                    onChange={e => setVariableToAdd(e.target.value)}
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-yellow-300 active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => {
                      if (variablesState.variables.has(variableToAdd)) {
                        setError(true)
                        return
                      }
                      setError(false)
                      variablesState.addVariable(variableToAdd)
                      modalState.setVisible(false)
                    }}
                  >
                    Add Variable
                  </button>
                  <button
                    className="bg-yellow-300 active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all 0.9s ease" }}
                    onClick={() => modalState.setVisible(false)}
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
