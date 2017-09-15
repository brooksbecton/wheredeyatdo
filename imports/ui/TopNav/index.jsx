import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";

import AccountsUIWrapper from "./../User/AccountsUIWrapper";

class TopNav extends Component {
  render() {
    return (
      <AppBar
        title="WDAD"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementRight={<AccountsUIWrapper />}
        onLeftIconButtonTouchTap={() => this.props.toggleSideNav()}
      />
    );
  }
}

TopNav.prototypes = {
  toggleSideNav: PropTypes.func
};

export default TopNav;
