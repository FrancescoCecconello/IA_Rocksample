import create from "zustand"
import { HARD_CONSTRAINT_STATE_CYCLE } from "../util/HARD_CONSTRAINT_CYCLE"
import HardConstraintClass from "../classes/HardConstraintClass"

export const ButtonsForHardConstraintModal = create(set => ({
  /**
   * inital current state for modal
   */
  currentState: HARD_CONSTRAINT_STATE_CYCLE.VARIABLES,
  /**
   * array of string
   */
  buttonsName: [],
  /**
   * Temp constraint
   */
  tempConstraint: new HardConstraintClass(),
  /**
   * In case a new variable is added, this function is called via useEffect,
   * to update buttonsName.
   * It is executed only if the current state is "TERM"
   * @param {*} variables variables string list
   * @returns updated buttonsName list with variables
   */
  setVariables: variables =>
    set(state => {
      if (state.currentState === HARD_CONSTRAINT_STATE_CYCLE.VARIABLES) {
        return {
          buttonsName: [...variables],
        }
      }
    }),
  /**
   * Create a new HardConstraintClass object
   * @returns
   */
  resetTempConstraint: () =>
    set(() => {
      return {
        tempConstraint: new HardConstraintClass(),
      }
    }),
  /**
   *
   * @param {*} buttonPressed
   * @param {*} variables
   * @returns
   */
  goToNextState: (buttonPressed, variables) =>
    set(state => {
      switch (+state.currentState) {
        case HARD_CONSTRAINT_STATE_CYCLE.TERM: {
          state.tempConstraint.term = buttonPressed
          state.buttonsName = variables
          state.currentState = HARD_CONSTRAINT_STATE_CYCLE.VARIABLES

          return {
            buttonsName: [...state.buttonsName],
            currentState: state.currentState,
            tempConstraint: state.tempConstraint,
          }
        }

        case HARD_CONSTRAINT_STATE_CYCLE.VARIABLES: {
          state.tempConstraint.variable = buttonPressed
          state.buttonsName = ["<", "<=", ">=", ">"]
          state.currentState = HARD_CONSTRAINT_STATE_CYCLE.OPERATOR
          return {
            buttonsName: [...state.buttonsName],
            currentState: state.currentState,
          }
        }

        case HARD_CONSTRAINT_STATE_CYCLE.OPERATOR: {
          state.tempConstraint.operator = buttonPressed
          state.buttonsName = ["value", "variable"]
          state.currentState = HARD_CONSTRAINT_STATE_CYCLE.CHOICE
          return {
            buttonsName: [...state.buttonsName],
            currentState: state.currentState,
          }
        }

        case HARD_CONSTRAINT_STATE_CYCLE.CHOICE: {
          if (buttonPressed === "variable") {
            state.buttonsName = variables
          } else {
            state.buttonsName = []
          }
          state.currentState = HARD_CONSTRAINT_STATE_CYCLE.TERM
          return {
            buttonsName: [...state.buttonsName],
            currentState: state.currentState,
          }
        }

        default:
          console.error("Current state is not matching any of the cases")
      }
    }),
}))

export default ButtonsForHardConstraintModal
