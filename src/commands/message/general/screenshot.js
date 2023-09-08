const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const puppeteer = require("puppeteer");
module.exports = new Object({
    name: "screenshot",
    description: "screenshots.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['ss'],
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

        let website = args[0];
        if (!website) return message.reply("By the moonlight, insert the web link").catch((e) => { });
        let loading = await message.reply(`Screenshotting website page <a:_util_loading:863317596551118858>`);

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(website);
            await page.setViewport({ width: 1920, height: 1080})

            const screenshot = await page.screenshot();
            await browser.close();

            const buffer = Buffer.from(screenshot, 'base64');
            const attachment = new AttachmentBuilder(buffer, { name: 'screenshot.png' });

            const embed = new EmbedBuilder()
                .setColor('2b2d31')
                .setImage('attachment://screenshot.png')

            await loading.edit({ content: '⁣', embeds: [embed], files: [attachment] })
        } catch (e) {
            await loading.edit({ content: 'There was an error getting that screenshot-\n**try again with a valid website** ⚠'})
        }
    }
})







