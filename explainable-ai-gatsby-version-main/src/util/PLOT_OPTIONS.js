export const RED_BACKGROUND = "rgba(255, 99, 132, 0.5)"
export const RED_COLOR = "rgb(255, 99, 132)"

export const GREEN_BACKGROUND = "rgba(75, 192, 192, 0.5)"
export const GREEN_COLOR = "rgb(75, 192, 192)"

export const GREY_BACKGROUND = "rgba(128,128,128,0.5)"
export const GREY_COLOR = "rgb(128,128,128)"

export const OPTIONS = {
  tooltips: {
    titleFontSize: 16,
    bodyFontSize: 14
  },
  legend: {
    display: false
  },
  scales: {

    xAxes: [{
      stacked: true,
      ticks: {
        fontSize: 16
      },
      scaleLabel: {
        display: true,
        labelString: "State",
        fontColor: "black",
        fontSize: 16
      }
    }
    ],
    yAxes: [{
      stacked: true,
      ticks: {
        max: 1,
        min: 0,
        stepSize: 0.1,
        fontSize: 16
      },
      scaleLabel: {
        display: true,
        labelString: "Prob of state belief",
        fontColor: "black",
        fontSize: 16
      }
    }]
  }
}
