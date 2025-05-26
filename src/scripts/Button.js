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
  const buttonFiles = getJSFiles(join(__dirname, "..", "components"));
  for (const filePath of buttonFiles) {
    const buttons = require(filePath);
    client.ButtonInt.set(buttons.id, buttons);
    count++;
  }
  client.console.log(`Loaded: ${count}`, "button");
};
