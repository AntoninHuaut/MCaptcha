const client = require('../discord').getClient();
const sql = require('../sql');
const manageVerif = require('../discord/utils/manageVerif');
const expireMinuts = 5;

exports.showLogin = async function (req, res) {
    const userId = req.params.userId;
    const keyId = req.params.keyId;

    res.render('login', {
        captcha: res.recaptcha,
        path: req.path,
        formURL: `/${userId}/${keyId}`,
        discord: getDiscordInfo(await sql.getCheckByKeyValid(keyId, userId))
    });
}

exports.checkLogin = async function (req, res) {
    const userId = req.params.userId;
    const keyId = req.params.keyId;

    const opt = {
        msg: ""
    };

    try {
        if (req.recaptcha.error)
            opt.msg = 'Le captcha est invalide';
        else {
            const checkRes = await sql.getCheckByKeyValid(keyId, userId);
            opt.discord = getDiscordInfo(checkRes);

            const dateInsert = new Date(checkRes.length ? checkRes[0].dateInsert : 0);
            dateInsert.setMinutes(dateInsert.getMinutes() + expireMinuts);

            if (!checkRes.length || dateInsert < new Date())
                opt.msg = 'La clé est invalide ou expirée';
            else if (checkRes[0].validCaptcha == 1)
                opt.msg = 'Votre compte est déjà vérifié';
            else {
                await sql.updateCheck(checkRes[0].numCheck, 1);
                opt.msg = 'Votre compte est maintenant vérifié, vous pouvez fermer cette page';

                manageVerif.verifSuccess(userId);
            }
        }
    } catch (err) {
        console.error(err);
        opt.msg = 'Une erreur du serveur est survenue, la vérification a été annulée';
    }

    const servers = [];
    client.guilds
    .filter(guild => guild.members.has(userId))
    .forEach(guild => servers.push(guild.name));

    if (servers.length) opt.servers = servers;

    res.render('callback', opt);
};

function getDiscordInfo(checkRes) {
    if (!checkRes.length) return;

    const user = client.users.get(checkRes[0].userId);
    if (!user) return;

    return {
        avatarURL: user.avatarURL,
        username: user.username,
        discriminator: user.discriminator
    }
}

exports.getExpireMinuts = () => {
    return expireMinuts;
}