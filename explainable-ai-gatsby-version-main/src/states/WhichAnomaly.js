import create from "zustand"
import { ANOMALIES } from "../util/ANOMALIES_TYPE"

export const WhichAnomaly = create(set => ({
  type: ANOMALIES.SAME_ACTION,
  setType: type => set(() => ({ type: type })),
  setStore: store => set(() => store),
}))
