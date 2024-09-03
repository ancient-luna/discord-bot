const { ActivityType } = require("discord.js");

/**
 * @param {import('../structures/BotClient')} client
 */
function updatePresence(client) {
    let message = client.config.PRESENCE.MESSAGE;

    const getType = (type) => {
        switch (type) {
            case "COMPETING":
                return ActivityType.Competing;

            case "LISTENING":
                return ActivityType.Listening;

            case "PLAYING":
                return ActivityType.Playing;

            case "WATCHING":
                return ActivityType.Watching;

            case "STREAMING":
                return ActivityType.Streaming;
        }
    };

    client.user.setPresence({
        status: client.config.PRESENCE.STATUS,
        activities: [
            {
                name: message,
                type: getType(client.config.PRESENCE.TYPE),
            },
        ],
    });
}

module.exports = function handlePresence(client) {
    updatePresence(client);
    setInterval(() => updatePresence(client), 10 * 60 * 1000);
};