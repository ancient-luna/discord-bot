const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const jsdom = require("jsdom");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("record")
        .setDescription("tracking weekly CTS/CTL")
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The Dead Frontier Profile ID')
                .setRequired(true)),
    cooldown: 0,
    async execute(client, interaction) {
        const survivorID = interaction.options.getString('userid');

        await interaction.reply({ content: `Getting player status <a:u_load:1334900265953923085>` });

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
                .setColor(client.config.embedColorTrans)
                .setTimestamp();

            const btnProfile = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`DFP Profile`)
                        .setURL(`https://www.dfprofiler.com/profile/view/${survivorID}`),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`Updated Profile Image`)
                        .setURL(`https://www.dfprofiler.com/signaturereplicate.php?profile=${survivorID}&imgur=5q7hV6B.png`)
                );

            await interaction.editReply({
                content: '⁣',
                embeds: [embedRecord],
                components: [btnProfile],
            });
        } catch (error) {
            console.error("Error:", error);
            await interaction.editReply({
                content: `Something wrong happened..\n**unable to send the record now**`
            });
        }
    }
};
