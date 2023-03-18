const {
    postSignup,
    postLogin,
    postLogout,
} = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.route("/signup").post(postSignup);
authRouter.route("/login").post(postLogin);
authRouter.route("/logout").post(postLogout);

module.exports = { authRouter };
