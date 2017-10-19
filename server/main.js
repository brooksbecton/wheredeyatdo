import { Meteor } from "meteor/meteor";
import "dotenv";
import "../imports/api/geopoints";
import { roles } from "./../imports/app/roles";

// code to run on server at startup
Meteor.startup(() => {
  Meteor.users.remove({});

  const adminId = Accounts.createUser({
    email: Meteor.settings.admin.email,
    password: Meteor.settings.admin.pass,
    profile: { name: "admin" }
  });
  const busId = Accounts.createUser({
    email: Meteor.settings.bus.email,
    password: Meteor.settings.bus.pass,
    profile: { name: "bus" }
  });

  Roles.addUsersToRoles(adminId, [roles.administrator]);
  Roles.addUsersToRoles(busId, [roles.busDriver]);
});
