import PropTypes from "proptypes";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import GeoInput from "./GeoInput/index";
import GeopointList from "./GeopointList/index";
import LoginModal from "./LoginModal/index";
import SideNav from "./SideNav/index";
import TopNav from "./TopNav/index";
import TrackingMap from "./TrackingMap/index";
import AccountsUIWrapper from "./User/AccountsUIWrapper";
import LocationSnackBar from "./LocationSnackBar/index";

class App extends Component {
  constructor() {
    super();
    this.state = {
      broadcasting: false,
      logged: Meteor.user(),
      loginModalOpen: false,
      sideNavOpen: false
    };

    this.toggleBroadcast = this.toggleBroadcast.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }
  toggleBroadcast() {
    this.setState({ broadcasting: !this.state.broadcasting });
  }

  toggleLoginModal() {
    this.setState({ loginModalOpen: !this.state.loginModalOpen });
  }

  toggleSideNav() {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <TopNav
              logged={this.state.logged}
              toggleBroadcast={this.toggleBroadcast}
              toggleLoginModal={this.toggleLoginModal}
              toggleSideNav={this.toggleSideNav}
            />
            <SideNav
              open={this.state.sideNavOpen}
              toggleSideNav={this.toggleSideNav}
              toggleLoginModal={this.toggleLoginModal}
            />
            <LoginModal
              open={this.state.loginModalOpen}
              toggleLoginModal={this.toggleLoginModal}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <TrackingMap broadcasting={this.state.broadcasting} />
                )}
              />
              <Route exact path="/geopoints" component={GeopointList} />
            </Switch>
            <LocationSnackBar />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.prototypes = {
  geopoints: PropTypes.array
};

export default App;
