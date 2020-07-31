require("dotenv").config();
const { Client } = require("discord.js");
const { Bot } = require("cathy.js");
const client = new Client({
    disableMentions: "all"
});
const cathy = new Bot(); // create new chatbot client
const errorMessages = [
    "Sorry, I can't understand.",
    "What do you mean?",
    "uh",
    "I love you :D",
    "Why D:",
    "Wut?",
    "Hmm.",
    "idot",
    "idot, wdym?"
]; // messages to send if there's error

client.on("ready", () => {
    console.log("Bot is ready!");
    cathy.load(); // load cathy
});

cathy.on("ready", () => {
    console.log("Cathy is ready!");
});

client.on("message", async message => {
    if (message.author.bot || !message.guild) return;
    if (message.channel.id === "738092276051607703") {
        message.channel.startTyping();
        cathy.chat(message.content) // chat
        .then(msg => {
            if (!msg.content) return message.channel.send(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
            message.channel.stopTyping(true);
            return message.channel.send(msg.content);
        })
        .catch(e => {
            message.channel.stopTyping(true);
            return message.channel.send(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
        });
    }
});

client.login(process.env.TOKEN);
