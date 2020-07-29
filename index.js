require("dotenv").config();
const { Client } = require("discord.js");
const { Bot } = require("cathy.js");
const client = new Client({
    disableMentions: "all"
});
const cathy = new Bot();

client.on("ready", () => {
    console.log("Bot is ready!");
    cathy.load();
});

cathy.on("ready", () => {
    console.log("Cathy is ready!");
});

client.on("message", async message => {
    if (message.author.bot || !message.guild) return;
    if (message.channel.id === "738092276051607703") {
        message.channel.startTyping();
        cathy.chat(message.content)
        .then(msg => {
            if (!msg.content) return message.channel.send("idot, wdym?");
            message.channel.stopTyping(true);
            return message.channel.send(msg.content);
        })
        .catch(e => {
            message.channel.stopTyping(true);
            return message.channel.send("idot, wdym?");
        });
    }
});

client.login(process.env.TOKEN);