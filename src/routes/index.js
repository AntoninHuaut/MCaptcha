const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
exports.getLimiter = (windowMs, max, code, message) => {
    return rateLimit({
        windowMs: windowMs,
        max: max,
        message: {
            code: code,
            message: message
        }
    });
}
const baseLimiter = this.getLimiter(60 * 1000, 60, 429, "Trop grands nombres de requêtes, veuillez réessayer plus tard."); // 1 minute

router.use(express.static(__basedir + "/static"));

router.use("/", baseLimiter, require("./base_r"));
router.use("/", baseLimiter, require("./captcha_r"));


module.exports = router;