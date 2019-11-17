const client = require('../').getClient();
const nanoid = require('nanoid');
const sql = require('../../sql');
const config = require('../../../config.json');
const manageEmbed = require('./manageEmbed');

exports.verifSuccess = (userId) => {
    const user = client.users.get(userId);
    if (!user) return;

    user.send(":white_check_mark: Votre compte est maintenant vérfié !").catch(() => {});
    this.giveAllRole(user);
}

exports.giveAllRole = async (user) => {
    const guildList = await sql.getAllGuild();
    const guildKey = {};
    guildList.forEach(item => guildKey[item.guildId] = item.roleId);

    let guildMsg = "";

    client.guilds.forEach(async (guild, guildId) => {
        if (!guildKey[guildId]) return;

        let member = guild.members.get(user.id);
        if (!member) return;

        let res = await this.giveRole(member, guildKey[guildId]);

        if (res == 1) guildMsg += (guildMsg.length ? ", " : "") + guild.name;
    });

    if (guildMsg.length) user.send(`:information_source: Vous avez reçu le rôle sur le(s) serveur(s) : ${guildMsg}`).catch(() => {});
}

exports.generateLink = async (user, numGuild, guildName) => {
    await sql.updateDUser(user.id, user.username);
    const userInfo = await sql.getDUser(user.id);
    if (!userInfo.length) return;

    const numUser = userInfo[0].numUser;
    const keyId = nanoid(32);

    sql.insertCheck(keyId, numUser, numGuild);
    user.send(manageEmbed.getLinkEmbed(user, `${config.recaptcha.host}/${user.id}/${keyId}`, guildName)).catch(() => {});
}

exports.giveRole = async (member, roleId) => {
    if (!member || !roleId) return -2;

    const guild = member.guild;
    const roleToAdd = guild.roles.get(roleId);

    if (!roleToAdd || member.roles.has(roleToAdd.id)) return 0;

    try {
        await member.addRole(roleToAdd);
        return 1;
    } catch (err) {
        return -1;
    }
}