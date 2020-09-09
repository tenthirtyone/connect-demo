import React, { Component } from "react";
import ChartModal from "./components/ChartModal";
import Gmap from "./components/Gmap";
import probes from "./probes.json";
import logo from "./logo.png";
import "./App.scss";

class App extends Component {
  state = {
    showModal: false,
    accounts: null,
    nodes: [],
    id: null,
    nodeData: null,
    probeData: [],
  };

  componentDidMount() {
    let nodeMap = {};
    let nodes = [];

    const nodeData = probes.map((probe) => {
      let x = probe.latlon.replace("(", "").replace(")", "").split(",")[0];
      let y = probe.latlon.replace("(", "").replace(")", "").split(",")[1];

      nodeMap[probe.id_probe] = {
        id_probe: probe.id_probe,
        x,
        y,
        count: probes.filter((node) => {
          return node.id_probe === probe.id_probe;
        }).length,
      };

      return {
        ...probe,
        x,
        y,
      };
    });

    nodes = Object.keys(nodeMap).map((key) => {
      return nodeMap[key];
    });

    this.setState({ probeData: nodeData, nodeData, nodes });
  }

  toggleModal = async (node) => {
    const { showModal } = this.state;

    if (node) {
      this.setState({
        id: node.id_probe,
        nodeData: this.state.probeData.filter((probe) => {
          return probe.id_probe === node.id_probe;
        }),
        showModal: !showModal,
      });
    } else {
      this.setState({
        id: null,
        showModal: !showModal,
      });
    }
  };

  render() {
    const { google, showModal, nodes, id, nodeData } = this.state;

    return (
      <div className="App">
        <Header />
        <div className="row content">
          <Gmap google={google} nodes={nodes} toggleModal={this.toggleModal} />
          <ChartModal
            showModal={showModal}
            nodes={nodes}
            id={id}
            nodeData={nodeData}
            toggleModal={this.toggleModal}
          />
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div className="header">
      <span className="brand">
        <img src={logo} alt="logo"></img>
      </span>
    </div>
  );
}

export default App;
