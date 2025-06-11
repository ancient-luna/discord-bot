const fs = require('fs');
const { join } = require('path');
/**
 * @param {import('../index')} client
 */
module.exports = async (client) => {
	fs.readdir(`${__dirname}/../commands/slash/`, (err, files) => {
		if (err) client.logger.error(err);
		files.forEach((dir) => {
			fs.readdir(`${__dirname}/../commands/slash/${dir}/`, (err, file) => {
				if (err) client.logger.error(err);
				file.forEach((f) => {
					const props = require(`${__dirname}/../commands/slash/${dir}/${f}`);
					if (!props?.data?.name || typeof props.data.toJSON !== 'function') {
						client.logger?.warn?.(`[!] Skipped invalid slash command: ${f}`);
						return;
					}
					client.slashCommands.set(props.data.name, props);
				});
                client.console.log(`[/] ${dir} loaded with ${file.length} slash commands`, "scmd");
			});
		});
	});
};