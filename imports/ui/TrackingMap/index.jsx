import "leaflet";
import React, { Component } from "react";
import PropTypes from "proptypes";

import { isBusAccount } from "./../../app/auth";
import "./styles.css";

class TrackingMap extends Component {
  constructor() {
    super();
    const starkvilleLatLng = L.latLng(33.4504, -88.8184);
    this.state = { points: [], startingLatLng: starkvilleLatLng };

    this.map = {};
    this.markerGroup = {};
    this.popup = L.popup();

    this.addCircle = this.addCircle.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.drawMarkers = this.drawMarkers.bind(this);
    this.initMap = this.initMap.bind(this);
    this.printCoordOnClick = this.printCoordOnClick.bind(this);
    this.onLocationFound = this.onLocationFound.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount() {
    this.initMap(this.state.startingLatLng);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geopoints != prevProps.geopoints) {
      this.drawMarkers(this.props.geopoints);
    }
  }
  /**
   * Adds a circle to the map at latLng
   * @param {Object} latLng 
   */
  addCircle(latLng) {
    var circle = L.circle(latLng, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 125
    }).addTo(this.map);
  }

  /**
   * Adds a marker to map at latLng
   * @param {Object} latLng 
   */
  addMarker(latLng) {
    L.marker(latLng).addTo(this.markerGroup);
  }

  /**
   * Draws each point in map from array
   * @param {Array<latLng>} geopoints 
   */
  drawMarkers(geopoints) {
    //Clearing all geopoints
    this.markerGroup.clearLayers();

    //Re drawing new geopoints
    geopoints.map(p => {
      const newMarkerLatLng = L.LatLng(p.lat, p.lng);
      this.addMarker({ lat: p.lat, lng: p.lng });
    });
  }

  /**
   * 
   * @param {Object} latLng 
   */
  initMap(latLng) {
    //Gets map reference
    this.map = L.map("mapid").setView(latLng, 13);

    //Gets users current position
    this.map.locate({ setView: true, maxZoom: 12 });

    //Gets marker group reference
    this.markerGroup = L.layerGroup().addTo(this.map);

    //Gets & Draws backdrop to map
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

  /**
   * Adds marker to map when location is found
   * @param {Object<Event>} e 
   */
  onLocationFound(e) {
    const radius = e.accuracy / 2;

    L.marker(e.latlng)
      .addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point")
      .openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
  }

  /**
   * On click, adds marker to map and db
   * @param {Object<Event>} e 
   */
  onMapClick(e) {
    if (isBusAccount()) {
      Meteor.call("geopoints.insert", e.latlng);
      this.addMarker(e.latlng);
      this.updatePoints(e.latlng);
    }
  }

  /**
   * Prints a pop up when a user clicks on map
   * @param {Object} latLng 
   */
  printCoordOnClick(latLng) {
    this.popup
      .setLatLng(latLng)
      .setContent("You clicked the map at " + latLng.toString())
      .openOn(this.map);
  }

  render() {
    return <div id="mapid" />;
  }
}

TrackingMap.prototypes = {
  geopoints: PropTypes.array
};

export default TrackingMap;
