module.exports = {
  presenceHandler: require("./presence"),
  reminderHandler: require("./reminder").loadReminders,

  syncTagRolesHandler: require("./syncTagRoles"),
  radianceScheduler: require("./radianceScheduler"),
  countingSync: require("./countingSync"),
};