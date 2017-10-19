import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import { createContainer } from "meteor/react-meteor-data";
import PropTypes from "proptypes";
import React, { Component } from "react";

import PageContainer from "./../PageContainer";
import { GeoPoints } from "./../../api/geopoints";
import { isBusAccount } from "./../../app/auth";

class GeopointList extends Component {
  constructor() {
    super();

    this.deleteGeoPoints = this.deleteGeoPoints.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  deleteGeoPoints(geopoints) {
    geopoints.map(geopoint => {
      Meteor.call("geopoints.remove", geopoint["_id"]);
    });
  }

  renderList() {
    if (this.props.geopoints.length > 0) {
      return (
        <div>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>X</TableHeaderColumn>
                <TableHeaderColumn>Y</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.geopoints.map(geopoint => (
                <TableRow key={geopoint["_id"]}>
                  <TableRowColumn>{geopoint.lat}</TableRowColumn>
                  <TableRowColumn>{geopoint.lng}</TableRowColumn>
                  <TableRowColumn>
                    <FlatButton
                      label="X"
                      disabled={!isBusAccount()}
                      onClick={() => this.deleteGeoPoints([geopoint])}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FlatButton
            label="Delete All"
            onClick={() => this.deleteGeoPoints(this.props.geopoints)}
          />
        </div>
      );
    } else {
      return <strong>No GeoPoints</strong>;
    }
  }

  render() {
    return <PageContainer>{this.renderList()}</PageContainer>;
  }
}

GeopointList.defaultProps = {
  geopoints: []
};

GeopointList.prototypes = {
  geopoints: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, GeopointList);
