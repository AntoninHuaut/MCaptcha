const sql = require('.');

exports.getCheckByKeyValid = (keyId, userId) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query(`SELECT * FROM CHECKUSER join DUSER using(numUser) WHERE userId = ? and keyId = ? and dateInsert = (
                SELECT MAX(dateInsert) FROM CHECKUSER join DUSER using(numUser) WHERE userId = ?
            )`,
            [userId, keyId, userId], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        con.end();
    });
}

exports.getCheckByState = (userId, validCaptcha) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("SELECT * FROM CHECKUSER join DUSER using(numUser) WHERE userId = ? and validCaptcha = ?",
            [userId, validCaptcha], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        con.end();
    });
}

exports.updateCheck = (numCheck, validCaptcha) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("UPDATE CHECKUSER SET validCaptcha = ? WHERE numCheck = ?",
            [validCaptcha, numCheck], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        con.end();
    });
}

exports.insertCheck = (keyId, numUser, numGuild) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();

        const rq = "INSERT INTO CHECKUSER (keyId, dateInsert, numUser, numGuild) VALUES (?, ?, ?, ?)";
        const params = [keyId, new Date(), numUser];

        if (numGuild) params.push(numGuild);
        else params.push(null);

        con.query(rq, params, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
        con.end();
    });
}