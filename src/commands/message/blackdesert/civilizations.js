const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "civilizations",
    description: "civilizations.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: ['civilizations'],
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

        await message.delete().catch((e) => { });

        const IMGClasses = new AttachmentBuilder("src/assets/bdo/civilization_classes.png")
        const IMGPlatforms = new AttachmentBuilder("src/assets/bdo/civilization_platforms.png")
        const IMGRegions = new AttachmentBuilder("src/assets/bdo/civilization_regions.png")

        let embedClasses0 = new EmbedBuilder()
            .setDescription(`<:xu_bdo_class_warrior:1049947516529020989> Warrior <:xu_bdo_class_ranger:1049947590378135572> Ranger <:xu_bdo_class_sorceress:1049947619029426176> Sorceress <:xu_bdo_class_berserker:1049947648754458715> Berserker <:xu_bdo_class_tamer:1049949113300570142> Tamer\n<:xu_bdo_class_musa:1049949132376248421> Musa <:xu_bdo_class_maehwa:1049949154455068672> Maehwa <:xu_bdo_class_valkyrie:1049949201431285831> Valkyrie <:xu_bdo_class_kunoichi:1049949246603935775> Kunoichi <:xu_bdo_class_ninja:1049949280699432990> Ninja\n<:xu_bdo_class_wizard:1049949303210258472> Wizard <:xu_bdo_class_witch:1049949358738657340> Witch <:xu_bdo_class_darkknight:1049950571903324170> Dark Knight <:xu_bdo_class_striker:1049950590253412442> Striker <:xu_bdo_class_mystic:1049950610281201704> Mystic\n<:xu_bdo_class_lahn:1049950659245518878> lahn <:xu_bdo_class_archer:1049950676798681138> Archer <:xu_bdo_class_shai:1049950694699962448> Shai <:xu_bdo_class_guardian:1049950710432804935> Guardian <:xu_bdo_class_hashashin:1049950741785227344> Hashashin`)
            .setColor("2b2d31")

        let embedClasses1 = new EmbedBuilder()
            .setDescription(`<:xu_bdo_class_nova:1049950759225151519> Nova <:xu_bdo_class_sage:1049950787968704512> Sage <:xu_bdo_class_corsair:1049950807581261876> Corsair <:xu_bdo_class_drakania:1049951657632464927> Drakania`)
            .setColor("2b2d31")

        let embedPlatforms = new EmbedBuilder()
            .setDescription(`<:xs_bdo_pc:1049945683865632830> ⁣ PC <:xs_bdo_mobile:1049945681206460487> Mobile ⁣ <:xs_bdo_controller:1049945686411583548> Console`)
            .setColor("2b2d31")

        let embedRegions = new EmbedBuilder()
            .setDescription(`🇺🇸 North America\n🇺🇳 South America\n🇪🇺 Europe\n🇷🇺 Russia\n🇰🇷 Korea\n🇯🇵 Japan\n🇹🇼 Taiwan\n🎏 South East Asia\n🇲🇳 Middle East & North Africa`)
            .setColor("2b2d31")

        await message.channel.send({ files: [IMGClasses], embeds: [embedClasses0] }).catch(e => { });
        await message.channel.send({ embeds: [embedClasses1] }).catch(e => { });
        await message.channel.send({ files: [IMGPlatforms], embeds: [embedPlatforms] }).catch(e => { });
        await message.channel.send({ files: [IMGRegions], embeds: [embedRegions] }).catch(e => { });
    }
})