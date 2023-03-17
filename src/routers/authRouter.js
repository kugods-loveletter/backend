import express from "express";
import {
    postSignup,
    postLogin,
    getLogout
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/signup").post(postSignup);
authRouter.route("/login").post(postLogin);
authRouter.route("/logout").get(getLogout);

export default authRouter;
