import PropTypes from "proptypes";
import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createContainer } from "meteor/react-meteor-data";

import GeoInput from "./GeoInput/index";
import GeopointList from "./GeopointList/index";
import SideNav from "./SideNav/index";
import TopNav from "./TopNav/index";
import TrackingMap from "./TrackingMap/index";
import AccountsUIWrapper from "./User/AccountsUIWrapper";
import { GeoPoints } from "./../api/geopoints";
class App extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false
    };

    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav() {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TopNav toggleSideNav={this.toggleSideNav} />
          <TrackingMap geopoints={this.props.geopoints} />
          <SideNav
            open={this.state.sideNavOpen}
            toggleSideNav={this.toggleSideNav}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.prototypes = {
  geopoints: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, App);
