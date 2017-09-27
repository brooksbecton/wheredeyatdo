import React from "react";
import Snackbar from "material-ui/Snackbar";
import { createContainer } from "meteor/react-meteor-data";

import { GeoPoints } from "./../../api/geopoints";

export class LocationSnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geopoints != prevProps.geopoints) {
      this.handleTouchTap();
    }
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message="Location Updated"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({ ownerId: Meteor.userId }).fetch()
  };
}, LocationSnackBar);
