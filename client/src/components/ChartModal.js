import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./ChartModal.scss";

const options = {
  legend: {
    fontColor: "white",
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "white",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "white",
        },
      },
    ],
  },
};

export default class ChartModal extends Component {
  state = {
    chartTypes: ["browsing_avg_day", "ping_avg_day", "speed_down_avg_day"],
    currentChart: "browsing_avg_day",
  };
  createMapData = (nodeData) => {
    const { currentChart } = this.state;
    return {
      labels: nodeData.map((node) => node.date),
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255,255,0,0.4)",
          borderColor: "rgba(255,255,0,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(200,200,0,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(255,255,0,1)",
          pointHoverBorderColor: "rgba(255,255,0,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nodeData.map((node) =>
            node[currentChart] ? parseInt(node[currentChart], 10) : 0
          ),
        },
      ],
    };
  };

  changeCurrentChart = (currentChart) => {
    this.setState({
      currentChart,
    });
  };

  render() {
    const { showModal, toggleModal, id, nodeData } = this.props;
    const { chartTypes } = this.state;

    let count = 0;
    let series = [];

    if (nodeData) {
      count = nodeData.length;
      series = this.createMapData(nodeData);
    }

    return (
      <div id="ChartModal" className={showModal ? "modal" : "modal hidden"}>
        <div className="modal-head">
          <span onClick={() => toggleModal()}>
            <i className="fa fa-window-close fa-2x"></i>
          </span>
          <h3>{id}</h3>
          <select onChange={(evt) => this.changeCurrentChart(evt.target.value)}>
            {chartTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          <h4>{count} records</h4>
        </div>
        <div className="modal-body">
          <div className="content">
            {nodeData ? (
              <Line data={series} options={options} />
            ) : (
              <div className="loader">Loading...</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
