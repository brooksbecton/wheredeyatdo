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

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged: Meteor.user(),
      loginModalOpen: false,
      sideNavOpen: false
    };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav() {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  toggleLoginModal() {
    this.setState({ loginModalOpen: !this.state.loginModalOpen });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <TopNav
              logged={this.state.logged}
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
              <Route exact path="/" component={TrackingMap} />
              <Route exact path="/geopoints" component={GeopointList} />
            </Switch>
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
