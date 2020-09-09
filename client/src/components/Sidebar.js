import React, { Component } from "react";
import "./Sidebar.scss";

const hideSidebar = {
  left: "-20rem",
};
const showSidebar = {
  left: "0rem",
};

export default class Sidebar extends Component {
  state = {
    show: true,
    sidebarStyle: showSidebar,
  };

  toggleView = () => {
    const { show } = this.state;

    if (show) {
      this.setState({
        sidebarStyle: hideSidebar,
        show: !show,
      });
    } else {
      this.setState({
        sidebarStyle: showSidebar,
        show: !show,
      });
    }
  };

  render() {
    const { nodes, changePosition } = this.props;
    const { sidebarStyle } = this.state;
    return (
      <div id="Sidebar" style={sidebarStyle}>
        <div className="toggle">
          <i className="fa fa-bars" onClick={this.toggleView}></i>
        </div>
        <div className="sidebar">
          <SidebarItem
            title={"Nodes"}
            nodes={nodes}
            changePosition={changePosition}
          />
        </div>
      </div>
    );
  }
}

function SidebarItem({ title, nodes, changePosition }) {
  return (
    <div className="sidebar-item">
      <h3>{title}</h3>
      <ul className="sidebar-nodes">
        {nodes.map((node) => {
          return (
            <NodeItem
              key={node.id_probe}
              node={node}
              changePosition={changePosition}
            />
          );
        })}
      </ul>
    </div>
  );
}

function NodeItem({ node, changePosition }) {
  return (
    <li
      className="data-node"
      onClick={() => changePosition({ position: { lat: node.x, lng: node.y } })}
    >
      <div>
        <span className="id">
          Node ID: <br />
          {node.id_probe}
        </span>
        <span className="record">{node.count} Records</span>
      </div>
    </li>
  );
}
