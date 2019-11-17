const router = require("express").Router();

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const config = require("../../config.json");
const recaptcha = new Recaptcha(config.recaptcha.siteKey, config.recaptcha.secretKey, {
    theme: "dark"
});

const controller = require("../controllers/captcha_c");

router.get('/:userId/:keyId', recaptcha.middleware.render, controller.showLogin);

router.post('/:userId/:keyId', recaptcha.middleware.verify, controller.checkLogin);

module.exports = router;