import create from "zustand"
import VIEWS from "../util/VIEWS"
import logicConnector from "../util/LOGIC_CONNECTORS"

/**
 * Map function used for names variables
 * @param element
 * @param index
 * @returns {{name, id}}
 */
function returnArray(element, index) {
  return {
    id: index,
    name: element,
  }
}

/**
 * State for ModalAction component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
export const ButtonsName = create(set => ({
  currentState: new Map(), //initial state
  buttonsName: new Map(),

  setStore: store => set(() => store),

  addButtons: (actionSelected, problemAttributes) =>
    set(state => {
      state.buttonsName.set(
        actionSelected,
        problemAttributes.states.map(returnArray)
      )
      state.currentState.set(actionSelected, VIEWS.STATE_BELIEF)
      return {
        currentState: state.currentState,
        buttonsName: state.buttonsName,
      }
    }),

  resetButtonsName: () =>
    set(() => ({
      currentState: new Map(), //initial state
      buttonsName: new Map(),
    })),

  resetCurrentState: actionId =>
    set(state => {
      state.currentState.set(actionId, VIEWS.STATE_BELIEF)
      return {
        currentState: state.currentState,
      }
    }),

  resetButtonsHavingSpecificId: actionId =>
    set(state => {
      state.currentState.delete(actionId)
      state.buttonsName.delete(actionId)
      return {
        currentState: state.currentState,
        buttonsName: state.buttonsName,
      }
    }),

  goToNextState: (actionSelected, problemAttributes, variables, args) =>
    set(state => {
      if (problemAttributes === undefined) {
        return
      }
      switch (+state.currentState.get(actionSelected)) {
        case VIEWS.LOGIC_CONNECTOR: {
          state.buttonsName.set(
            actionSelected,
            problemAttributes.states.map(returnArray)
          )
          state.currentState.set(actionSelected, VIEWS.STATE_BELIEF)
          return {
            buttonsName: state.buttonsName,
            currentState: state.currentState,
          }
        }

        case VIEWS.STATE_BELIEF: {
          state.buttonsName.set(
            actionSelected,
            ["<", "<=", ">=", ">"].map(returnArray)
          )
          state.currentState.set(actionSelected, VIEWS.OPERATOR)
          return {
            buttonsName: state.buttonsName,
            currentState: state.currentState,
          }
        }
        case VIEWS.OPERATOR: {
          const variablesObjects = variables.map((element, index) => {
            return { id: index, name: element }
          })
          state.buttonsName.set(actionSelected, variablesObjects)
          state.currentState.set(actionSelected, VIEWS.VARIABLE)
          return {
            buttonsName: state.buttonsName,
            currentState: state.currentState,
          }
        }

        case VIEWS.VARIABLE: {
          state.buttonsName.set(
            actionSelected,
            Object.keys(logicConnector).map(returnArray)
          )
          state.currentState.set(actionSelected, VIEWS.LOGIC_CONNECTOR)
          return {
            buttonsName: state.buttonsName,
            currentState: state.currentState,
          }
        }

        default:
          console.error("Current state is not matching any of the cases")
      }
    }),
}))

export default ButtonsName
