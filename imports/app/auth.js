export function isBusAccount() {
  if (Meteor.user()) {
    if (
      Meteor.user().username == "bus1" ||
      Meteor.user().username == "bus2" ||
      Meteor.user().username == "bus3"
    ) {
      return true;
    }
  } else {
    return false;
  }
}
