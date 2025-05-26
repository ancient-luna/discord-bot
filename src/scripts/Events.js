const { readdirSync, statSync } = require("node:fs");
const { join, extname } = require("path");
/**
 * @param {string} dir
 * @returns {string[]}
 */
function getJSFiles(dir) {
  const files = [];
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getJSFiles(fullPath));
    } else if (extname(fullPath) === ".js") {
      files.push(fullPath);
    }
  }
  return files;
}
/**
 * @param {import('../index')} client
 */
module.exports = (client) => {
  let count = 0;
  const eventFiles = getJSFiles(join(__dirname, "..", "events"));
  for (const filePath of eventFiles) {
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
    count++;
  }
  client.console.log(`Loaded: ${count}`, "event");
};