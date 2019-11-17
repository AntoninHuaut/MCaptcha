const sql = require('../../sql');
const config = require('../../../config.json');

module.exports = async (msg, content) => {
    if (msg.channel.type === 'dm') return msg.reply(':x: Cette commande doit être effectuée sur un serveur').catch(() => {});
    const member = msg.member;
    if (!isAdmin(member)) return msg.reply(":x: Vous n'avez pas la permission").catch(() => {});

    const contentSplit = content.split(' ');
    if (contentSplit.length < 2) return msg.reply(`:x: **Format :** \`${config.discord.prefix}config <roleTag | roleId | roleName>\``).catch(() => {});

    const roleMention = msg.mentions.roles.first();
    let roleSelect;
    if (roleMention) roleSelect = roleMention;

    else {
        const roleById = msg.guild.roles.get(contentSplit[1]);
        if (roleById) roleSelect = roleById;

        else {
            const roleByName = msg.guild.roles.find(role => role.name.toLowerCase() === contentSplit[1].toLowerCase());
            if (roleByName) roleSelect = roleByName;
        }
    }
    
    if (!roleSelect) return msg.reply(`:x: Aucun role n'a été trouvé avec le paramètre \`${contentSplit[1]}\``).catch(() => {});
    
    await sql.updateGuild(msg.guild.id, roleSelect.id);
    msg.reply(`:white_check_mark: Le serveur a été configuré avec le rôle **${roleSelect.name}** _(${roleSelect.id}_)`).catch(() => {});
}

function isAdmin(member) {
    return member.hasPermission("ADMINISTRATOR");
}