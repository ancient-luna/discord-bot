const { SlashCommandBuilder, EmbedBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags } = require('discord.js');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const dayjs = require('dayjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("code")
        .setDescription("Check active redeemable codes for games")
        .addStringOption(option =>
            option.setName("game")
                .setDescription("Choose the game name to get redeemable codes for")
                .setRequired(true)
                .addChoices(
                    { name: 'Black Desert Online', value: 'bdo' },
                    { name: 'Heartopia', value: 'heartopia' }
                )
        ),

    cooldown: 3,

    async execute(client, interaction) {
        await interaction.deferReply();
        const game = interaction.options.getString("game");

        try {
            if (game === 'bdo') {
                await handleBDO(interaction);
            } else if (game === 'heartopia') {
                await handleHeartopia(interaction);
            }
        } catch (error) {
            console.error(error);
            const errorText = new TextDisplayBuilder().setContent(`Error fetching codes: ${error.message}`);
            const container = new ContainerBuilder().addTextDisplayComponents(errorText);
            await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
        }
    },
};

async function handleBDO(interaction) {
    try {
        const response = await axios.get('https://garmoth.com/coupons', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Garmoth parsing (placeholder implementation due to 403 block)
        // If we get past 403, we would look for coupons here.

        // Since we anticipate failure, we provide a message.
        const text = new TextDisplayBuilder().setContent("Garmoth.com is currently blocking automated access. Please visit [Garmoth Coupons](https://garmoth.com/coupons) to copy codes manually.");
        const container = new ContainerBuilder().addTextDisplayComponents(text);
        await interaction.editReply({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        });

    } catch (error) {
        if (error.response && error.response.status === 403) {
            const text = new TextDisplayBuilder().setContent("Visit [Garmoth Coupons](https://garmoth.com/coupons)\n-# Luna+ is just a lazy dev <:game_luna_bdo:1467868642489143408>");
            const container = new ContainerBuilder().addTextDisplayComponents(text);
            await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
        } else {
            // Re-throw if it's another error we didn't expect
            const text = new TextDisplayBuilder().setContent(`Error contacting Garmoth: ${error.message}`);
            const container = new ContainerBuilder().addTextDisplayComponents(text);
            await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
        }
    }
}

async function handleHeartopia(interaction) {
    const url = 'https://heartopia.life/codes/';
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const codesList = [];
        const tables = document.querySelectorAll('table');

        if (tables.length > 0) {
            const table = tables[0]; // Assume first table is active codes
            const rows = table.querySelectorAll('tr');

            // Skip header row if it exists (usually first row)
            // Heuristic: Check if first row has <th> or contained text "Code"
            let startIndex = 0;
            if (rows.length > 0) {
                const firstRowText = rows[0].textContent.toLowerCase();
                if (firstRowText.includes('code') || rows[0].querySelector('th')) {
                    startIndex = 1;
                }
            }

            for (let i = startIndex; i < rows.length; i++) {
                const cols = rows[i].querySelectorAll('td');
                if (cols.length >= 3) {
                    const code = cols[0].textContent.trim();
                    const reward = cols[1].textContent.trim();
                    const expiry = cols[2].textContent.trim();

                    if (code) {
                        codesList.push({
                            code: code,
                            reward: reward,
                            expiry: expiry
                        });
                    }
                }
            }
        }

        const validCodes = codesList.filter(c => c.code.length < 50 && !c.code.toLowerCase().includes("expired"));

        if (validCodes.length === 0) {
            const errorText = new TextDisplayBuilder().setContent(`Could not extract Heartopia codes automatically. Please check [Heartopia Codes](${url}).`);
            const container = new ContainerBuilder().addTextDisplayComponents(errorText);
            await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
            return;
        }

        const container = new ContainerBuilder();
        const header = new TextDisplayBuilder().setContent(`# Heartopia Codes <:game_luna_heartopia:1467868726635266100>\n-# Found ${validCodes.length} active codes`);
        container.addTextDisplayComponents(header);
        container.addSeparatorComponents(new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large }));

        let currentChunk = "";
        for (const item of validCodes) {
            const itemString = `**Code:** \`${item.code}\`\n**Expires:** ${item.expiry}\n**Reward:** ${item.reward}\n\n`;

            // Check if adding this item would exceed a reasonable chunk size (e.g. 2000 chars)
            if (currentChunk.length + itemString.length > 2000) {
                container.addTextDisplayComponents(new TextDisplayBuilder().setContent(currentChunk));
                currentChunk = itemString;
            } else {
                currentChunk += itemString;
            }
        }

        if (currentChunk.length > 0) {
            container.addTextDisplayComponents(new TextDisplayBuilder().setContent(currentChunk));
        }

        // const footer = new TextDisplayBuilder().setContent(`[Source](${url})`);
        // container.addTextDisplayComponents(footer);

        await interaction.editReply({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        });
    } catch (error) {
        console.error(error);
        const errorText = new TextDisplayBuilder().setContent(`Error scraping Heartopia: ${error.message}`);
        const container = new ContainerBuilder().addTextDisplayComponents(errorText);
        await interaction.editReply({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        });
    }
}
