const { readdirSync } = require('fs');
const { join } = require('path');

/**
 * @param {import('../index')} client
 */
module.exports = (client) => {
    let count = 0;
    readdirSync(join(__dirname, "..", "commands", "slash")).forEach((dir) => {
        const commandFiles = readdirSync(join(__dirname, "..", "commands", "slash", dir)).filter((f) => f.endsWith(".js"));
        for (const file of commandFiles) {
            const props = require(`../commands/slash/${dir}/${file}`);
            if (!props?.data?.name || typeof props.data.toJSON !== 'function') {
                client.logger?.warn?.(`[!] Skipped invalid slash command: ${file}`);
                continue;
            }
            client.slashCommands.set(props.data.name, props);
            count++;
        }
    });
    client.console.log(`Loaded: ${count}`, "scmd");
};