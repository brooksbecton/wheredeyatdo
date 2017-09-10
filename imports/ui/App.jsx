import PropTypes from "proptypes";
import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";

import GeoInput from "./GeoInput/index";
import GeopointList from "./GeopointList/index";
import TrackingMap from "./TrackingMap/index";
import { GeoPoints } from "./../api/geopoints";
import AccountsUIWrapper from "./User/AccountsUIWrapper";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Where Dey At!?</h1>
        <AccountsUIWrapper />
        <GeoInput />
        <h2>Geopoint List</h2>
        <GeopointList geopoints={this.props.geopoints} />
        <h2>Tracking Map</h2>
        <TrackingMap />
      </div>
    );
  }
}

App.prototypes = {
  geopoints: PropTypes.array
};

export default createContainer(() => {
  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, App);
