const sql = require('.');

exports.getDUser = (userId) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("SELECT * FROM DUSER WHERE userId = ?", [userId], (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
        con.end();
    });
}

exports.updateDUser = (userId, lastUsername) => {
    return new Promise((resolve, reject) => {
        const con = sql.getConnection();
        con.query("INSERT INTO DUSER (userId, lastUsername) VALUES (?, ?) ON DUPLICATE KEY UPDATE lastUsername = VALUES(lastUsername)",
            [userId, lastUsername], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        con.end();
    });
}