const config = require('../../../config.json');
const cooldownSeconds = 5;
const cooldown = {};

module.exports = (msg) => {
    const userId = msg.author.id;

    if (cooldown[userId] && cooldown[userId] + cooldownSeconds * 1000 > Date.now()) {
        const cd = cooldown[userId] + cooldownSeconds * 1000 - Date.now();
        return msg.reply(`:x: Veuillez patienter ${cd/1000} secondes`).catch(() => {});
    }

    cooldown[userId] = Date.now();
    const content = msg.content.slice(config.discord.prefix.length).trim();

    if (content.startsWith('verif')) require('./verif')(msg);
    else if (content.startsWith('config')) require('./config')(msg, content);
    else require('./info')(msg);
}