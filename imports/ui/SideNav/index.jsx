import React from "react";
import { Link } from "react-router-dom";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import Anchor from "./../Anchor";

const SideNav = ({ open, toggleLoginModal, toggleSideNav }) => {
  return (
    <div>
      <Drawer open={open} onClick={toggleSideNav}>
        <MenuItem>
          <Anchor to="/">Home</Anchor>{" "}
        </MenuItem>
        <MenuItem>
          <Anchor to="/geopoints">Points List</Anchor>{" "}
        </MenuItem>
        <MenuItem onClick={toggleLoginModal}>Login</MenuItem>
        <MenuItem onClick={toggleSideNav}>Close Nav</MenuItem>
      </Drawer>
    </div>
  );
};

export default SideNav;
