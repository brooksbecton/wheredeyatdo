import React, { Component } from "react";
import "leaflet";

import "./styles.css";

class TrackingMap extends Component {
  constructor() {
    super();
    this.state = { starkvilleLatLng: L.latLng(33.4504, -88.8184) };
    this.initMap = this.initMap.bind(this);
  }

  initMap(latLng) {
    var mymap = L.map("mapid").setView(latLng, 13);
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
    ).addTo(mymap);
  }

  componentDidMount() {
    this.initMap(this.state.starkvilleLatLng);
  }

  render() {
    return <div id="mapid" />;
  }
}

export default TrackingMap;
