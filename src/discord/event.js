const commands = require("./commands");
const sql = require('../sql');
const manageVerif = require('./utils/manageVerif');

const client = require('./').getClient();
const config = require("../../config.json");

client.on('message', async (msg) => {
    if (!msg.content.startsWith(config.discord.prefix)) return;
    if (msg.content.includes('testadd')) return guildJoin(msg.member);
    commands(msg);
});

client.on('guildMemberAdd', guildJoin);

async function guildJoin(member) {
    const guild = member.guild;
    if (!guild) return;

    try {
        const guildInfo = await sql.getGuild(guild.id);
        if (guildInfo.length == 0) return;

        const validCaptcha = await sql.getCheckByState(member.user.id, 1);

        if (validCaptcha.length) {
            let res = await manageVerif.giveRole(member, guildInfo[0].roleId);
            let msg;

            if (res == 1)
                msg = `:white_check_mark: Vous avez reçu le rôle pour le serveur ${guild.name}`;
            else if (res < 0)
                msg = `:x: Impossible de vous ajouter le rôle pour le serveur ${guild.name}`;

            member.user.send(msg).catch(() => {});
        } else
            manageVerif.generateLink(member.user, guildInfo[0].numGuild, guild.name);
    } catch (err) {
        console.error(err);
    }
}