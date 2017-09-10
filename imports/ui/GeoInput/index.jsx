import React, { Component } from "react";

class GeoInput extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="geoInput">
            GeoPoint<br />
            <input id="geoInput" type="text" />
          </label>
          <br />
          <input id="submitButton" type="submit" />
        </form>
      </div>
    );
  }
}

export default GeoInput;
