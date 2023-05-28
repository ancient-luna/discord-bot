const fs = require('fs');
const path = require('path');
const util = require('../utils/index');
const fileName = 'default.json';
const file = fs.readFileSync(path.resolve(__dirname, fileName));

function load() {
    try {
        const config = JSON.parse(file);
        util.printLog('info', JSON.stringify(config));
        util.printLog('info', 'Configuration file loaded successfully');
        return config;
    } catch (err) {
        // eslint-disable-next-line no-console
        util.printLog('error', err);
        return null;
    }
}

async function save(config) {
    fs.writeFile(path.resolve(__dirname, fileName), JSON.stringify(config), (err) => {
        if (err) {
            util.printLog('error', 'Error while writing config file');
            throw err;
        }
        util.printLog('info', 'Configuration file saved successfully');
        return true;
    });
}

module.exports = { load, save };