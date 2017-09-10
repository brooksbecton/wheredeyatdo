import React, { Component } from "react";
import PropTypes from "proptypes";

class GeopointList extends Component {
  render() {
    return (
      <ul>
        {this.props.geopoints.map(geopoint => {
          return <li>{geopoint}</li>;
        })}
      </ul>
    );
  }
}

GeopointList.prototypes = {
  geopoints: PropTypes.array
};

export default GeopointList;
