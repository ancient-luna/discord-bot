const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    await message.delete().catch((e) => {});

    const IMGwielder = new MessageAttachment("src/assets/toram/saviour_wielder.png")
    const IMGsaviour = new MessageAttachment("src/assets/toram/saviour_legendary.png")
    const IMGjourney = new MessageAttachment("src/assets/toram/saviour_journey.png")
    const IMGmemoir = new MessageAttachment("src/assets/toram/saviour_memoir.png")
    
    const BOWemoji = '<:xnot_toram_wpn_bow:952256066824065105>';
    const CBemoji = '<:xnot_toram_wpn_cb:952256067264454718>';
    const DSemoji = '<:xnot_toram_wpn_ds:952256067654524929>';
    const KNUCKemoji = '<:xnot_toram_wpn_gauntlet:952256067277062164>';
    const HBemoji = '<:xnot_toram_wpn_hb:952256067914567771>';
    const KTNemoji = '<:xnot_toram_wpn_katana:952256067449024552>';
    const OHSemoji = '<:xnot_toram_wpn_ohs:952256067260260402>';
    const THSemoji = '<:xnot_toram_wpn_ths:952256067633561721>';
    const STAFFemoji = '<:xnot_toram_wpn_staff:952256067407052810>';

    const DPSemoji = "<:xnot_toram_buff_dps:964953526184861796>";
    const TANKemoji = "<:xnot_toram_buff_tank:964954042537246720>";
    const SUPPORTemoji = "<:xnot_toram_buff_support:964953608909099018>";

    const STOODIEemoji = "<:xnot_toram_mats_stoodie:964976213523304568>";
    const HUNTemoji = "<:xnot_toram_mats_treasure:964976140013957201>";
    const MATSemoji = "<:xnot_toram_mats_material:964996561102835752>";

    const TIMEemoji = "<:xnot_toram_memo_waiting:964999066712936448>";
    const NOTEemoji = "<:xnot_toram_memo_note:964999299484250186>";

    let embedWielder = new MessageEmbed()
        .setDescription(`${BOWemoji} - **Bow wielder** wind caller\n${CBemoji} - As sneaky **Bowgun wielder**\n${DSemoji} - **Dual Sword wielder** master\n${KNUCKemoji} - Short **Knuckle wielder** operator \n${HBemoji} - The **Halberd wielder** seeker\n${KTNemoji} - Bloomy light **Katana wielder**\n${OHSemoji} - **One-handed Sword wielder** saviour\n${THSemoji} - Heartless **Two-Handed Sword wielder**\n${STAFFemoji} - Unstoppable **Staff wielder** magician`)
        .setThumbnail("https://i.imgur.com/9iCRGhG.png")
        .setColor("#2f3136")

    let embedSaviour = new MessageEmbed()
        .setDescription(`${DPSemoji} - **DPS** Focus\n\n*It is used as a metric in journey to allow a determination of offensive power for their ability to destroy and eliminate.*\n\n${TANKemoji} - Bravery **Tanker**\n\n*A saviour that draws attackers away from other players. They’re typically burly warriors, knights, or paladins that most likely gained their nickname from their big muscles. They tend to be decked out in battle-worn steel, like a living tanker.*\n\n${SUPPORTemoji} - **Support** Specialist\n\n*Usually had one role in the group: Make everyone else better. This wasn’t the easiest role to take on for many reasons. It’s difficult to be the class that doesn’t actively do something like do the most damage or ensure no one else gets hit.*`)
        .setColor("#2f3136")

    let embedJourney = new MessageEmbed()
        .setDescription(`${STOODIEemoji} - **Stoodie's Experiment** Dungeon and Regislets\n${HUNTemoji} - Companions from all over the world as **Treasures Hunter** with Pelulu Keys\n${MATSemoji} - **Restless Farm Materials** night. Any materials will do, just anything`)
        .setColor("#2f3136")

    let embedMemoir = new MessageEmbed()
        .setDescription(`${TIMEemoji} - Reminder for food buffland to water, harvest, and cook. **Daydreamer**'s dream\n${NOTEemoji} - A humble **Librarian** that know how knowledges help other lost saviours`)
        .setColor("#2f3136")

    await message.channel.send({ files: [IMGwielder], embeds: [embedWielder] }).catch(e => {});
    await message.channel.send({ files: [IMGsaviour], embeds: [embedSaviour] }).catch(e => {});
    await message.channel.send({ files: [IMGjourney], embeds: [embedJourney] }).catch(e => {});
    await message.channel.send({ files: [IMGmemoir], embeds: [embedMemoir] }).catch(e => {});
}

module.exports.help = {
    name: 'saviour'
}