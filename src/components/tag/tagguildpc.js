const { MessageFlags, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, TextDisplayBuilder } = require("discord.js");

module.exports = {
  name: "tagguildpc",
  id: "btn-tagguildpc",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },

  execute: async (client, interaction) => {
    const container = new ContainerBuilder()
    const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
    const step1Text = new TextDisplayBuilder().setContent("Ⅰ. User Setting")
    const step1 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/M0CeXkQ.png'
        }
      }])
    const step2Text = new TextDisplayBuilder().setContent("Ⅱ. Edit Profiles")
    const step2 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/S3iZqoP.png'
        }
      }])
    const step3Text = new TextDisplayBuilder().setContent("Ⅲ. Server Tag")
    const step3 = new MediaGalleryBuilder()
      .addItems([{
        type: 'image',
        media: {
          url: 'https://i.imgur.com/eOSTkeQ.png'
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