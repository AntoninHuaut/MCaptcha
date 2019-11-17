const web = require("express")();
const hbs = require('express-hbs');
const bodyParser = require("body-parser");
const path = require("path");
const config = require("../config.json");
require('./sql');

global.__basedir = __dirname;

web.use(bodyParser.json());
web.use(bodyParser.urlencoded({
    extended: true
}));

web.engine('hbs', hbs.express4({
    partialsDir: path.join(__basedir, '/views/partials'),
    layoutsDir: path.join(__basedir, '/views/layouts'),
    defaultLayout: path.join(__basedir, "/views/layouts/main"),
}));
web.set('view engine', 'hbs');
web.set('views', path.join(__basedir, '/views/pages'));

web.use(require("./routes"));

web.listen(config.port, () => console.log(`Start on :${config.port}`)).on('error', err => console.error(err));

require('./discord');
process.on('unhandledRejection', (reason, promise) => console.log(`Unhandled Rejection\n  Promise: ${promise}\n  Reason: ${reason.stack || reason}`));