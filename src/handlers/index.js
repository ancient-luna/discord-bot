module.exports = {
  presenceHandler: require("./presence"),
  reminderHandler: require("./reminder").loadReminders,
};