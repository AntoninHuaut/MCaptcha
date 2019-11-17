const mysql = require('mysql');
const config = require('../../config.json');
const fs = require('fs');
const readline = require('readline');
const fileName = "script.sql";

const checkUser = require('./checkUser');
exports.getCheckByKeyValid = checkUser.getCheckByKeyValid;
exports.getCheckByState = checkUser.getCheckByState;
exports.insertCheck = checkUser.insertCheck;
exports.updateCheck = checkUser.updateCheck;

const duser = require('./duser');
exports.getDUser = duser.getDUser;
exports.updateDUser = duser.updateDUser;

const guild = require('./guild');
exports.getAllGuild = guild.getAllGuild;
exports.getGuild = guild.getGuild;
exports.updateGuild = guild.updateGuild;

exports.getConnection = () => {
    let con = mysql.createConnection({
        host: config.sql.host,
        port: config.sql.port,
        user: config.sql.user,
        password: config.sql.password,
        database: config.sql.database
    });
    con.connect();
    return con;
};

(function initTable() {
    const rl = readline.createInterface({
        input: fs.createReadStream(__dirname + '/' + fileName),
        terminal: false
    });

    const con = exports.getConnection();
    let line = "";

    rl.on('line', chunk => {
        line += chunk.toString('utf-8');
        if (!line.trim().endsWith(';')) return;

        line = line.replace(/(\r\n|\n|\r)/gm, '');
        con.query(line, () => {});
        line = "";
    }, () => {});

    rl.on('close', () => con.end());
})();