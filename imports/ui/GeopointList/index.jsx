import { createContainer } from "meteor/react-meteor-data";
import PropTypes from "proptypes";
import React, { Component } from "react";

import PageContainer from "./../PageContainer";
import { GeoPoints } from "./../../api/geopoints";
import { isBusAccount } from "./../../app/auth";

class GeopointList extends Component {
  constructor() {
    super();

    this.deleteGeoPoints = this.deleteGeoPoints.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  deleteGeoPoints(geopoints) {
    geopoints.map(geopoint => {
      Meteor.call("geopoints.remove", geopoint["_id"]);
    });
  }

  renderList() {
    if (this.props.geopoints.length > 0) {
      return (
        <div>
          <button onClick={() => this.deleteGeoPoints(this.props.geopoints)}>
            Delete All
          </button>
          <ol>
            {this.props.geopoints.map(geopoint => {
              return (
                <li key={geopoint["_id"]}>
                  {geopoint.lat + ", " + geopoint.lng}
                  <button
                    disabled={!isBusAccount()}
                    onClick={() => this.deleteGeoPoints([geopoint])}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      );
    } else {
      return <strong>No GeoPoints</strong>;
    }
  }

  render() {
    return <PageContainer>{this.renderList()}</PageContainer>;
  }
}

GeopointList.defaultProps = {
  geopoints: []
};

GeopointList.prototypes = {
  geopoints: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, GeopointList);
