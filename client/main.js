import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import "../imports/api/geopoints.js";
import "../imports/startups/accounts-config";
import App from "../imports/ui/App.jsx";

Meteor.startup(() => {
  render(<App />, document.getElementById("render-target"));
});
