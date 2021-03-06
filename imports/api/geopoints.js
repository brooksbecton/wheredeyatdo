import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { isBusAccount } from "./../app/auth";
export const GeoPoints = new Mongo.Collection("geopoints");

// Deny all client-side updates on the Lists collection
GeoPoints.allow({
  insert() {
    return isBusAccount();
  },
  update() {
    return isBusAccount();
  },
  remove() {
    return isBusAccount();
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("geopoints", function geopointsPublication() {
    return GeoPoints.find({}, { sort: { createdAt: -1 }, limit: 20 });
  });
}

Meteor.methods({
  "geopoints.insert"(geopoint) {
    check(geopoint.lat, Number);
    check(geopoint.lng, Number);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    GeoPoints.insert({
      createdAt: new Date(),
      lat: geopoint.lat,
      lng: geopoint.lng,
      ownerId: Meteor.userId()
    });
  },
  "geopoints.remove"(id) {
    check(id, String);

    GeoPoints.remove(id);
  }
});
