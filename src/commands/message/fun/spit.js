const { AttachmentBuilder } = require("discord.js");

module.exports = new Object({
    name: "spit",
    description: "hawk tuah!",
    category: "fun",
    usage: `spit <@user> | (reply to a message)`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        let IMGpuih = new AttachmentBuilder("src/assets/react/puihh.gif")
        let target = message.mentions.members.first();
        if (!target) {
            message.react("❓");
            return message.reply({ content: "How can *She* spits when theres no one to spit on! `Mention one` 💢" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }
        await message.react("💢");
        await message.channel.send({
            content: `***Hawk tuah!!*** 💦 <@970232550087864331> spits on <@${target.user.id}>\n_ _`,
            files: [IMGpuih]
        });
    }
});