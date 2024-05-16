const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const jsdom = require("jsdom");
const axios = require('axios');

module.exports = {
    name: "record",
    description: "record.",
    category: "Deadfrontier",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const survivorID = args.join(" ");
        if (!survivorID) return message.channel.send("Do `!record` `id`");

        const loadingTxt = await message.reply(`Getting player status <a:_util_loading:863317596551118858>`);

        const timestamp = Date.now();

        const option = {
            url: `https://www.dfprofiler.com/profile/json/${survivorID}?_=${timestamp}`,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        };

        try {
            const response = await axios(option);
            const body = response.data;

            let stat = body;

            const domUsername = new jsdom.JSDOM(stat['username']);
            let username = domUsername.window.document.querySelector("a").textContent;

            let exp_since_death = stat['exp_since_death'];
            let weekly_ts = stat['weekly_ts'];
            let all_time_ts = stat['all_time_ts'];

            let weekly_loot = stat['weekly_loot'];
            let all_time_loot = stat['all_time_loot'];

            let daily_tpk = stat['daily_tpk'];
            let weekly_tpk = stat['weekly_tpk'];
            let all_time_tpk = stat['all_time_tpk'];

            let lastloot = stat['lastloot'];

            const embedRecord = new EmbedBuilder()
                .setTitle(`${username}'s record`)
                .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                .addFields(
                    { name: `**EXP Since Death**`, value: `${exp_since_death} EXP`, inline: true },
                    { name: `**Weekly TS**`, value: `${weekly_ts} EXP`, inline: true },
                    { name: `**⭐ All Time TS**`, value: `${all_time_ts} EXP`, inline: true },
                    { name: `**Last Loot Item**`, value: lastloot, inline: true },
                    { name: `**Weekly Loot**`, value: `${weekly_loot} Loot Points`, inline: true },
                    { name: `**⭐ All Time Loot**`, value: `${all_time_loot} Loot Points`, inline: true },
                    { name: `**Daily TPK**`, value: `${daily_tpk} Kill`, inline: true },
                    { name: `**Weekly TPK**`, value: `${weekly_tpk} Kill`, inline: true },
                    { name: `**⭐ All Time TPK**`, value: `${all_time_tpk} Kill`, inline: true }
                )
                .setImage(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B`)
                .setFooter({ text: `Powered by Ancient Luna`, iconURL: 'https://i.imgur.com/vKo3PJm.png' })
                .setColor('202225')
                .setTimestamp();

            const btnProfile = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`DFP Profile`)
                        .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`Updated Profile Image`)
                        .setURL(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)
                );

            loadingTxt.edit({
                content: '⁣',
                embeds: [embedRecord],
                components: [btnProfile],
            });
        } catch (error) {
            console.error("Error:", error);
            loadingTxt.edit({
                content: `Something wrong happened..\n**unable to send the record now**`
            });
        }
    }
};
