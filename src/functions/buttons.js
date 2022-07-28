const fs = require('fs');

module.exports = (client) => {
    client.handleButtons = async (buttonFolders, path) => {
        for (folder of buttonFolders) {
            const buttonFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of buttonFiles) {
                const button = require(`../buttons/${folder}/${file}`);
                client.buttons.set(button.name, button)
            }
        }
    }
};