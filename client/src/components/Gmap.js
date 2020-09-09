import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Sidebar from "./Sidebar";
import mapStyle from "./map-style";
import "./Gmap.scss";

class Gmap extends Component {
  state = {
    zoom: 3,
    position: {
      lat: 7.174948422,
      lng: -73.14409712,
    },
  };

  changePosition = ({ position }) => {
    this.setState({
      position,
      zoom: 11,
    });
  };

  render() {
    const { google, nodes, toggleModal } = this.props;
    const { position, zoom } = this.state;

    return (
      <div className="connect-map">
        <Sidebar nodes={nodes} changePosition={this.changePosition} />

        <Map
          google={google}
          zoom={zoom}
          styles={mapStyle}
          mapTypeControl={false}
          initialCenter={position}
          center={position}
        >
          {nodes.map((node) => {
            const position = {
              lat: node.x,
              lng: node.y,
            };
            return (
              <Marker
                key={node.id_probe}
                position={position}
                title={node.id_probe}
                onClick={() => toggleModal(node)}
              />
            );
          })}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCu-4OQuDOSqgze8uS3G_8ov5pzr3_oe4c",
})(Gmap);
