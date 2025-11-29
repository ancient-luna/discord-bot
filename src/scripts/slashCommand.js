const { readdirSync, statSync } = require('fs');
const { join } = require('path');

module.exports = (client) => {
    let count = 0;
    const loadCommands = (dir) => {
        try {
            const files = readdirSync(dir);
            for (const file of files) {
                const path = join(dir, file);
                const stat = statSync(path);
                if (stat.isDirectory()) {
                    loadCommands(path);
                } else if (file.endsWith('.js')) {
                    try {
                        const props = require(path);
                        if (!props?.data?.name || typeof props.data.toJSON !== 'function') {
                            continue;
                        }
                        client.slashCommands.set(props.data.name, props);
                        count++;
                    } catch (e) {
                        console.error(`[SlashCommand] Error loading ${file}:`, e);
                    }
                }
            }
        } catch (e) {
            console.error(`[SlashCommand] Error reading directory ${dir}:`, e);
        }
    };

    loadCommands(join(__dirname, "..", "commands", "slash"));
    client.console.log(`Loaded: ${count}`, "scmd");
};