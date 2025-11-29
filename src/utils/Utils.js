const { EmbedBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js")
const { readdirSync, lstatSync } = require("fs");
const { join, extname } = require("path");
const permissions = require("../structures/Permissions");

module.exports = class Utils {
    
    static containsLink(text) {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
            text
        );
    }

    static containsDiscordInvite(text) {
        return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(
            text
        );
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static isHex(text) {
        return /^#[0-9A-F]{6}$/i.test(text);
    }

    static diffHours(dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60 * 60;
        return Math.abs(Math.round(diff));
    }
    
    async replyOops(msg, args) {
        const config = require("../config/config")
        if (!msg) return;
        if (!args) return;

        let container = new ContainerBuilder();
        let textDisplay = new TextDisplayBuilder().setContent(`${args}`);
        container.addTextDisplayComponents(textDisplay);

        let m = await msg.reply({ flags: MessageFlags.IsComponentsV2, components: [container] });
        setTimeout(async () => {
            if (m && m.deletable) await m.delete().catch(() => { });
        }, 7000);
    };

    msToTime(duration) {
        const milliseconds = parseInt((duration % 1000) / 100);
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    static timeformat(timeInSeconds) {
        const days = Math.floor((timeInSeconds % 31536000) / 86400);
        const hours = Math.floor((timeInSeconds % 86400) / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.round(timeInSeconds % 60);
        return (
            (days > 0 ? `${days} days, ` : "") +
            (hours > 0 ? `${hours} hours, ` : "") +
            (minutes > 0 ? `${minutes} minutes, ` : "") +
            (seconds > 0 ? `${seconds} seconds` : "")
        );
    }

    static durationToMillis(duration) {
        return duration
            .split(":")
            .map(Number)
            .reduce((acc, curr) => curr + acc * 60) * 1000;
    }

    static getRemainingTime(timeUntil) {
        const seconds = Math.abs((timeUntil - new Date()) / 1000);
        const time = Utils.timeformat(seconds);
        return time;
    }

    static parsePermissions(perms) {
        const permissionWord = `permission${perms.length > 1 ? "s" : ""}`;
        return "`" + perms.map((perm) => permissions[perm]).join(", ") + "` " + permissionWord;
    }

    async invalidArgs(commandName, message, args, client) {
        try {
            let color = client.color ? client.color : "BLURPLE";
            let prefix = client.prefix;
            let command = client.Commands.get(commandName) || client.Commands.get(client.Aliases.get(commandName));
            if (!command) return await message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription(args)] }).catch(() => { });
            let embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: message.author.tag.toString(), iconURL: message.author.displayAvatarURL({ dynamic: true }).toString() })
                .setDescription(`**${args}**`)
                .setTitle(`**${command.name}**`)
                .addFields([
                    {
                        name: "Usage",
                        value: `\`${command.usage ? `${prefix}${command.name} ${command.usage}` : `${prefix}${command.name}`}\``,
                        inline: false
                    },
                    {
                        name: "Example(s)",
                        value: `${command.examples ? `\`${prefix}${command.examples.join(`\`\n\`${prefix}`)}\`` : "`" + prefix + command.name + "`"}`
                    }
                ]);
            return await message.reply({
                embeds: [embed],
            });
        } catch (e) {
            console.error(e);
        };
    };

    static recursiveReadDirSync(dir, allowedExtensions = [".js"]) {
        const filePaths = [];
        const readCommands = (dir) => {
            const files = readdirSync(join(process.cwd(), dir));
            files.forEach((file) => {
                const stat = lstatSync(join(process.cwd(), dir, file));
                if (stat.isDirectory()) {
                    readCommands(join(dir, file));
                } else {
                    const extension = extname(file);
                    if (!allowedExtensions.includes(extension)) return;
                    const filePath = join(process.cwd(), dir, file);
                    filePaths.push(filePath);
                }
            });
        };
        readCommands(dir);
        return filePaths;
    }
};