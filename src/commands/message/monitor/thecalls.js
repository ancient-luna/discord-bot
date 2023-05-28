const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "thecalls",
    description: "thecalls.",
    category: "Deadfrontier",
    usage: "",
    cooldown: 0,
    aliases: ['thecalls'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: ['ManageMessages'],
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

        await message.delete().catch((e) => { });

        const IMGthecalls = new AttachmentBuilder("src/assets/df/thecalls.png")

        let embedCalls = new EmbedBuilder()
            .setDescription(`<:zdf_call_outpostattack:1101942716104974438> Outpost Attack Shouter<:zdf_call_mission:1101942084056911995> Missions Specialist\n<:zdf_call_bandit:1101941930620899452> Bandit Raid <:zdf_call_devilhound:1101941570640556103> Devil Hounds Slayer <:zdf_call_volatileleaper:1101941601808425130> Volatile Leapers Hunter`)
            .setColor("2b2d31")

        await message.channel.send({ files: [IMGthecalls], embeds: [embedCalls] }).catch(e => { });
    }
})




