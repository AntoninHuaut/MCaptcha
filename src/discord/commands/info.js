const manageEmbed = require('../utils/manageEmbed');

module.exports = (msg) => {
    msg.channel.send(manageEmbed.getInfoEmbed(msg.author)).catch(() => {});
}