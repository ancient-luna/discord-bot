const { MessageFlags, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, TextDisplayBuilder } = require("discord.js");

module.exports = {
  name: "tagguildmobile",
  id: "btn-tagguildmobile",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },

  execute: async (client, interaction) => {
    const container = new ContainerBuilder()
    const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
    const step1Text = new TextDisplayBuilder().setContent("Ⅰ. Profile")
    const step1 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/gi5mlmg.png'
        }
      }])
    const step2Text = new TextDisplayBuilder().setContent("Ⅱ. Edit Profile")
    const step2 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/fNXTYMw.png'
        }
      }])
    const step3Text = new TextDisplayBuilder().setContent("Ⅲ. Server Tag")
    const step3 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/dzW8iRR.jpeg'
        }
      }])
    const textFooter = new TextDisplayBuilder().setContent("-# *scroll down until you see the server tag option")
    container.addTextDisplayComponents(step1Text)
    container.addMediaGalleryComponents(step1)
    container.addSeparatorComponents(separator)
    container.addTextDisplayComponents(step2Text)
    container.addMediaGalleryComponents(step2)
    container.addSeparatorComponents(separator)
    container.addTextDisplayComponents(step3Text)
    container.addMediaGalleryComponents(step3)
    container.addSeparatorComponents(separator)
    container.addTextDisplayComponents(textFooter)
    return interaction.reply({
      flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
      components: [container]
    });
  },
};