const fs = require('fs');
const path = require('path');

const util = require('../utils/index');

const fileName = 'default.json';
const file = fs.readFileSync(path.resolve(__dirname, fileName));

let config;

function load() {
  try {
    config = JSON.parse(file);
    util.printLog('info', JSON.stringify(config));
    util.printLog('info', 'Configuration file loaded successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    util.printLog('error', err);
  }
}

function save() {
  fs.writeFile(fileName, config, (err) => {
    if (err) {
      util.printLog('error', 'Error while writing config file');
      return;
    }

    util.printLog('error', 'Configuration file saved successfully');
  });
}

module.exports = { load, save };
