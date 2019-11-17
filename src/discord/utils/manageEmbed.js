const Discord = require('discord.js');
const config = require('../../../config.json');
const captcha_c = require('../../controllers/captcha_c');

exports.getInfoEmbed = (author) => {
    return this.getBaseEmbed(author, config.recaptcha.host)
        .setDescription(`**${config.discord.prefix}** Affiche les informations
            \n**${config.discord.prefix}config** Configure le serveur
            \n**${config.discord.prefix}verif** Génère un lien de vérification`);
}

exports.getLinkEmbed = (author, url, guildName) => {
    let msgDesc;

    if (guildName)
        msgDesc = `:information_source: Pour profiter pleinement du serveur **${guildName}**, vous devez compléter le captcha en cliquant [ici](${url})`;
    else
        msgDesc = `:information_source: Vous pouvez compléter le captcha en cliquant [ici](${url})`;

    return this.getBaseEmbed(author, url)
        .setDescription(msgDesc)
        .addField('Expiration', `Le lien expire dans ${captcha_c.getExpireMinuts()} minutes,
            vous pouvez regénérer un nouveau lien via la commande **${config.discord.prefix}verif**`, false);
}

exports.getBaseEmbed = (author, url) => {
    return new Discord.RichEmbed()
        .setColor('#7289DA')
        .setTitle('MCaptcha')
        .setURL(url)
        .setFooter(author.tag, author.avatarURL)
        .setTimestamp();
}