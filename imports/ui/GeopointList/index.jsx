import React, { Component } from "react";
import PropTypes from "proptypes";

class GeopointList extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    Meteor.call("geopoints.remove", id);
  }

  render() {
    return (
      <ul>
        {this.props.geopoints.map(geopoint => {
          return (
            <li key={geopoint["_id"]}>
              {geopoint.lat + ", " + geopoint.lng}
              <button onClick={() => this.handleDelete(geopoint["_id"])}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

GeopointList.prototypes = {
  geopoints: PropTypes.array
};

export default GeopointList;
