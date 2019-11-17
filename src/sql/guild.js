const sql = require('./');

exports.getAllGuild = () => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("SELECT * FROM GUILD", (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
        con.end();
    });
}

exports.getGuild = (guildId) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("SELECT * FROM GUILD WHERE guildId = ?", [guildId], (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
        con.end();
    });
}

exports.updateGuild = (guildId, roleId) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("INSERT INTO GUILD (guildId, roleId) VALUES (?, ?) ON DUPLICATE KEY UPDATE roleId = VALUES(roleId)",
            [guildId, roleId, roleId, guildId], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        con.end();
    });
}