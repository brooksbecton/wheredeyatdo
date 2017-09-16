import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

const SideNav = ({ open, toggleLoginModal, toggleSideNav }) => {
  return (
    <div>
      <Drawer open={open}>
        <MenuItem onClick={toggleLoginModal}>Login</MenuItem>
        <MenuItem onClick={toggleSideNav}>Close Nav</MenuItem>
      </Drawer>
    </div>
  );
};

export default SideNav;
