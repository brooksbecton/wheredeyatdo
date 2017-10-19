import { roles } from "./roles";

export const isAdmin = () =>
  Roles.userIsInRole(Meteor.user(), [roles.administrator]);

export const isBusAccount = () =>
  Roles.userIsInRole(Meteor.user(), [roles.administrator, roles.busDriver]);
