const { EmbedBuilder, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags, SectionBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios");
module.exports = new Object({
    name: "dictionary",
    description: "example sentences based on Urban Dictionary definitions",
    category: "general",
    usage: `dictionary <word>`,
    cooldown: 0,
    aliases: ['whatis', 'urban', 'meaning', 'meaningof'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        let query = args.join(" ");
        if (!query) return message.reply("By the moonlight, what you seeks for?");

        let link = "https://api.urbandictionary.com/v0/define?term="
        let fetch = await axios(link + encodeURI(query));
        fetch = fetch.data.list;

        if (fetch.length === 0) {
            return message.reply("My knowledge can't define the word further, try seek another wisdom");
        }

        let randomIndex = Math.floor(Math.random() * fetch.length);
        let data = fetch[randomIndex];
        let title = data.word
        let permalink = data.permalink
        let author = data.author
        let definition = data.definition
        let example = data.example
        let thumbsUp = data.thumbs_up
        let thumbsDown = data.thumbs_down

        definition = definition.length >= 1024 ? definition.slice(0, 1020) + "..." : definition;
        example = example.length >= 1024 ? example.slice(0, 1020) + "..." : example;
        
        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textHeader = new TextDisplayBuilder().setContent(`## [${title}](${permalink})\n-# author: ${author}`)
        const sectionHeader = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setStyle(ButtonStyle.Link)
                .setURL(permalink)
                .setLabel('See Dictionary')
            )
        const textDefinition = new TextDisplayBuilder().setContent(`${definition}`)
        const textExample = new TextDisplayBuilder().setContent(`-# __example__\n${example}`)
        const textRate = new TextDisplayBuilder().setContent(`-# rating ↑ ${thumbsUp} ↓ ${thumbsDown}`)

        container.addSectionComponents(sectionHeader)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textDefinition)
        container.addTextDisplayComponents(textExample)
        container.addTextDisplayComponents(textRate)

        return message.reply({ flags: MessageFlags.IsComponentsV2, components: [container] });
    }
})