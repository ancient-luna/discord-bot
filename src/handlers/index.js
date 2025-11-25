module.exports = {
  presenceHandler: require("./presence"),
  reminderHandler: require("./reminder").loadReminders,
  syncRolesHandler: require("./syncRoles"),
  syncTagRolesHandler: require("./syncTagRoles"),
  radianceScheduler: require("./radianceScheduler"),
};