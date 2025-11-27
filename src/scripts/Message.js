const { readdirSync, statSync } = require('node:fs');
const { join } = require('path');
/**
 * @param {import('../index')} client 
 */
module.exports = (client) => {
    let count = 0;
    const loadCommands = (dir) => {
        const files = readdirSync(dir);
        for (const file of files) {
            const path = join(dir, file);
            const stat = statSync(path);
            if (stat.isDirectory()) {
                loadCommands(path);
            } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
                const command = require(path);
                const parentDir = dir.split(/[\\/]/).pop();
                if (command.category && command.category !== parentDir) command.category = parentDir;
                client.Commands.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) {
                    for (const alias of command.aliases) client.Aliases.set(alias, command.name);
                }
                count++;
            }
        }
    };
    loadCommands(join(__dirname, "..", "commands", "message"));
    client.console.log(`Loaded: ${count}`, "cmd");
}