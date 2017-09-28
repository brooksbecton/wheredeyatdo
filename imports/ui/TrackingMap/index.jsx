import "leaflet";
import { createContainer } from "meteor/react-meteor-data";
import React, { Component } from "react";
import PropTypes from "proptypes";

import { GeoPoints } from "./../../api/geopoints";
import { isBusAccount } from "./../../app/auth";

import "./styles.css";

class TrackingMap extends Component {
  constructor() {
    super();
    const starkvilleLatLng = L.latLng(33.4504, -88.8184);
    this.state = {
      gettingLocation: false,
      points: [],
      secondsElapsed: 0,
      startingLatLng: starkvilleLatLng
    };

    // Ref to interval so it can be cleared later
    this.interval = {};

    this.map = {};
    this.markerGroup = {};
    this.popup = L.popup();

    this.addCircle = this.addCircle.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.drawMarkers = this.drawMarkers.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.initMap = this.initMap.bind(this);
    this.printCoordOnClick = this.printCoordOnClick.bind(this);
    this.onLocationFound = this.onLocationFound.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.tick = this.tick.bind(this);
    this.toggleWatchLocation = this.toggleWatchLocation.bind(this);
  }

  componentDidMount() {
    this.initMap(this.state.startingLatLng);
    this.drawMarkers(this.props.geopoints);
    this.interval = setInterval(this.tick, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    // Drawing new geopoints when availible
    if (this.props.geopoints != prevProps.geopoints) {
      this.drawMarkers(this.props.geopoints);
    }

    if (this.props.broadcasting != prevProps.broadcasting) {
      this.toggleWatchLocation(this.props.broadcasting);
    }
  }

  componentWillUnmount() {
    //Stopping interval
    clearInterval(this.interval);
  }

  /**
   * Adds a circle to the map at latLng
   * @param {Object} latLng 
   */ addCircle(
    latLng
  ) {
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
   * Starts an async function to get a users current position
   * The results of the find are heard by the function
   * 'onLocationFound'
   */
  getCurrentLocation() {
    this.setState({ gettingLocation: true });
    this.map.locate();
  }

  /**
   * 
   * @param {Object} latLng 
   */
  initMap(latLng) {
    //Gets map reference
    this.map = L.map("mapid").setView(latLng, 13);

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
  onLocationFound({ latlng: latLng }) {
    this.setState({ gettingLocation: false });
    if (isBusAccount()) {
      Meteor.call("geopoints.insert", latLng);
    }
    this.addMarker(latLng);
  }

  /**
   * On click, adds marker to map and db
   * @param {Object<Event>} e 
   */
  onMapClick(e) {
    if (isBusAccount()) {
      Meteor.call("geopoints.insert", e.latlng);
      this.addMarker(e.latlng);
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

  /**
   * Updates state of component with the number of seconds past
   */
  tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  }

  toggleWatchLocation(broadcasting) {
    if (broadcasting) {
      this.map.locate({ watch: true, enableHighAccuracy: true });
    } else {
      this.map.stopLocate();
    }
  }

  render() {
    return <div id="mapid" />;
  }
}

TrackingMap.prototypes = {
  broadcasting: PropTypes.bool.isRequired,
  geopoints: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe("geopoints");

  return {
    geopoints: GeoPoints.find({}).fetch()
  };
}, TrackingMap);
