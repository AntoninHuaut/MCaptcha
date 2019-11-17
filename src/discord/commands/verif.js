const sql = require('../../sql');
const manageVerif = require('../utils/manageVerif');

module.exports = async (msg) => {
    const validCaptcha = await sql.getCheckByState(msg.author.id, 1);

    if (validCaptcha.length) {
        manageVerif.giveAllRole(msg.author);
        return msg.reply(":x: Votre compte est déjà vérifié").catch(() => {});
    }

    manageVerif.generateLink(msg.author);
}