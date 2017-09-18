import React from "react";
import { Link } from "react-router-dom";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import Anchor from "./../Anchor";

const SideNav = ({ open, toggleSideNav }) => {
  return (
    <div>
      <Drawer open={open} onClick={toggleSideNav}>
        <Anchor to="/">
          <MenuItem onClick={toggleSideNav}>Home</MenuItem>
        </Anchor>
        <Anchor to="/geopoints">
          <MenuItem onClick={toggleSideNav}>Points List</MenuItem>
        </Anchor>
        <MenuItem onClick={toggleSideNav}>Close Nav</MenuItem>
      </Drawer>
    </div>
  );
};

export default SideNav;
