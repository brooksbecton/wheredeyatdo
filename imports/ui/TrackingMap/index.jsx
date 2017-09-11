import React, { Component } from "react";
import PropTypes from "proptypes";
import "leaflet";

import "./styles.css";

class TrackingMap extends Component {
  constructor() {
    super();
    const starkvilleLatLng = L.latLng(33.4504, -88.8184);
    this.state = { points: [], startingLatLng: starkvilleLatLng };

    this.map = {};
    this.popup = L.popup();

    this.addCircle = this.addCircle.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.initMap = this.initMap.bind(this);
    this.printCoordOnClick = this.printCoordOnClick.bind(this);
    this.onLocationFound = this.onLocationFound.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.updatePoints = this.updatePoints.bind(this);
  }

  componentDidMount() {
    this.initMap(this.state.startingLatLng);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geopoints != prevProps.geopoints) {
      this.props.geopoints.map(p => {
        const newMarkerLatLng = L.LatLng(p.lat, p.lng);
        this.addMarker({ lat: p.lat, lng: p.lng });
      });
    }
  }

  addCircle(latLng) {
    var circle = L.circle(latLng, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 125
    }).addTo(this.map);
  }

  addMarker(latLng) {
    L.marker(latLng).addTo(this.map);
  }

  initMap(latLng) {
    this.map = L.map("mapid").setView(latLng, 13);
    this.map.locate({ setView: true, maxZoom: 12 });

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJvYWJlY3QiLCJhIjoiY2o3ZjJvenhxMHQydzJ2cGpuanZzdHM1eSJ9.1x2hxYs_gU-cmBaiu-qXVg",
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoiYnJvYWJlY3QiLCJhIjoiY2o3ZjJvenhxMHQydzJ2cGpuanZzdHM1eSJ9.1x2hxYs_gU-cmBaiu-qXVg"
      }
    ).addTo(this.map);

    //Adding listeners
    this.map.on("click", this.onMapClick);
    this.map.on("locationfound", this.onLocationFound);
  }

  onLocationFound(e) {
    const radius = e.accuracy / 2;

    L.marker(e.latlng)
      .addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point")
      .openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
  }

  onMapClick(e) {
    Meteor.call("geopoints.insert", e.latlng);
    this.addMarker(e.latlng);
    this.updatePoints(e.latlng);
  }

  printCoordOnClick(latLng) {
    this.popup
      .setLatLng(latLng)
      .setContent("You clicked the map at " + latLng.toString())
      .openOn(this.map);
  }

  updatePoints(latLng) {
    const currentPoints = this.state.points;
    currentPoints.push(latLng);

    this.setState({ points: currentPoints });
  }

  render() {
    return <div id="mapid" />;
  }
}

TrackingMap.prototypes = {
  geopoints: PropTypes.array
};

export default TrackingMap;
