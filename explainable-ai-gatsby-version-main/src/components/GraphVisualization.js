import React, { useEffect } from "react"
import cytoscape from "cytoscape"
import ProblemState from "../states/ProblemState"
import axios from "axios"
import { RunState } from "../states/RunState"
import RuleSynthetizedState from "../states/RuleSynthetizedState"

import { useState } from "react"
import { WhichAnomaly } from "../states/WhichAnomaly"
import { ANOMALIES } from "../util/ANOMALIES_TYPE"
export function GraphVisualization() {
  const trace = ProblemState(state => state.trace)
  const rule = RuleSynthetizedState(state => state.rule)
  const whichAnomaly = WhichAnomaly()
  const run = RunState()
  let nodeSelected = undefined
  const [cy, setCy] = useState(undefined)

  if (run.run != undefined) {
    nodeSelected = run.run.step
  }

  function getRunLabel() {
    if (run.run != undefined) {
      return run.run.run
    }
    return undefined
  }

  function getStepLabel() {
    if (run.run != undefined) {
      return run.run.step
    }
    return undefined
  }

  function getGraphTitle() {
    if (getRunLabel() && getStepLabel()) {
      return "\n" + getRunLabel() + " step: " + getStepLabel()
    } else {
      return ""
    }
  }

  function createGraph(graph) {
    let cy = cytoscape({
      container: document.getElementById("graph"), // container to render in

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            width: "30rem",
            content: "data(id)",
            "text-valign": "center",
            color: "black",
            "background-color": "white",
            "border-color": "black",
            "border-width": "2px",
            "font-size": "12px",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "black",
            "target-arrow-color": "black",
            "target-arrow-shape": "triangle",
            label: "data(label)",
            "font-size": "16px",
            color: "black",
          },
        },
      ],
    })

    const graphRendered = []
    let tmpNode = {}
    for (const node of graph.nodes) {
      tmpNode = {}
      tmpNode["group"] = "nodes"
      tmpNode["data"] = {
        id: node.id,
      }
      tmpNode["position"] = {
        x: node["x"] * 70,
        y: node["y"] * 100,
      }
      graphRendered.push(tmpNode)
    }

    for (const edge of graph.edges) {
      tmpNode = {}
      tmpNode["group"] = "edges"
      tmpNode["data"] = {
        id: edge.start + edge.stop,
        source: edge.start,
        target: edge.stop,
        label: "",
      }
      graphRendered.push(tmpNode)
    }

    cy.add(graphRendered)

    cy.on("click", "node", function (evt) {
      var node = evt.target
      console.clear()
    })
    cy.userZoomingEnabled(false)
    cy.userPanningEnabled(false)
    cy.fit()

    setCy(cy)
  }

  async function fetchGraph() {
    const payload = {
      name: trace,
    }
    try {
      const response = await axios.post(
        "http://localhost:8001/api/get_graph_from_trace/",
        payload
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
    return undefined
  }

  useEffect(async () => {
    const graph = await fetchGraph()
    if (graph == undefined) {
      console.log("There were problems in fetching graph information")
      return
    }
    createGraph(graph)
  }, [trace])

  useEffect(() => {
    if (cy != undefined && nodeSelected != undefined) {
      cy.nodes().style("background-color", "white")
      cy.edges().style("line-color", "black")
      cy.edges().style("label", "")

      cy.nodes()[nodeSelected - 1].style("background-color", "red")

      let idNodeSelected = cy.nodes()[nodeSelected - 1].id()
      let idNextNode = cy.nodes()[nodeSelected].id()

      const edgeId = idNodeSelected + idNextNode
      const StringId = "[id='" + edgeId + "']"

      let edgeLabel = ""

      if (whichAnomaly.type == ANOMALIES.SAME_ACTION) {
        edgeLabel = rule["steps_counter_anomalies_same_action"][run.run.step]
      } else {
        edgeLabel =
          rule["steps_counter_anomalies_different_action"][run.run.step]
      }

      cy.edges(StringId).style("line-color", "red")
      cy.edges(StringId).style("label", edgeLabel)
    } else {
    }
  }, [nodeSelected])

  return (
    <div
      id="graph"
      className="border-2 rounded-lg shadow-lg w-auto h-auto m-5 p-3 text-lg"
      style={{
        width: "50rem",
        height: "30rem",
        display: "block",
      }}
    >
      <p className="text-center font-bold text-2xl">
        Graph state problem visualization
      </p>
      <p className="text-center font-bold text-2xl">{getGraphTitle()}</p>
    </div>
  )
}
