module.exports.run = async (client, message, args) => {

    let target = message.mentions.members.first();
    
    var errMessage = { content: "How can *She* spits when theres no one to spit on! Mention one 💢"  };
    if (!target) {
        message.react("💢").catch((e) => {});

        return message.reply(errMessage).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
        });
    }
    
    await message.react("💢").catch((e) => {});

    await message.channel.send({ content: `<@468656533522350090> spits on <@${target.user.id}> 💦` }).catch((e) => {});
}

module.exports.help = {
    name: 'spit'
}