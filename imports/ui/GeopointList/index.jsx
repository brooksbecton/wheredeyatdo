import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import PropTypes from "proptypes";

import { GeoPoints } from "./../../api/geopoints";
import { isBusAccount } from "./../../app/auth";

class GeopointList extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    Meteor.call("geopoints.remove", id);
  }

  render() {
    return (
      <ul>
        {this.props.geopoints.map(geopoint => {
          return (
            <li key={geopoint["_id"]}>
              {geopoint.lat + ", " + geopoint.lng}
              <button
                disabled={!isBusAccount()}
                onClick={() => this.handleDelete(geopoint["_id"])}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

GeopointList.prototypes = {
  geopoints: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, GeopointList);
