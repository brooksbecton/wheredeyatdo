import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

const SideNav = ({ open, toggleSideNav }) => {
  return (
    <div>
      <Drawer open={open}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem onClick={() => toggleSideNav()}>Close Nav</MenuItem>
      </Drawer>
    </div>
  );
};

export default SideNav;
