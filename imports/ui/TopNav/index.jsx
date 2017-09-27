import MenuItem from "material-ui/MenuItem";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Toggle from "material-ui/Toggle";
import React from "react";
import styled from "styled-components";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";

import { isBusAccount } from "./../../app/auth";

const Hamburger = styled(NavigationMenu)`vertical-align: middle;`;
const VerticalAlign = { alignItems: "center", display: "flex" };

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.renderBroadcastToggle = this.renderBroadcastToggle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.logged != prevProps.logged) {
      this.renderBroadcastToggle();
    }
  }

  renderBroadcastToggle() {
    if (isBusAccount()) {
      return (
        <MenuItem style={VerticalAlign}>
          <Toggle
            onClick={() => this.props.toggleBroadcast()}
            label="Broadcast"
          />
        </MenuItem>
      );
    }
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <MenuItem onClick={() => this.props.toggleSideNav()}>
            <Hamburger />
          </MenuItem>
          <ToolbarSeparator />
          {this.renderBroadcastToggle()}
        </ToolbarGroup>
        <ToolbarGroup>
          <MenuItem onClick={() => this.props.toggleLoginModal()}>
            Login
          </MenuItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

TopNav.proptypes = {
  toggleLoginModal: PropTypes.func.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  toggleBroadcast: PropTypes.func.isRequired
};
