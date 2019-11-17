const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.discord.activity, {
        type: "PLAYING"
    });
});

client.login(config.discord.token).then(() => require('./event'));

exports.getClient = () => {
    return client;
}