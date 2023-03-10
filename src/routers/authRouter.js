import express from "express";
import {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/signup").get(getSignup).post(postSignup);
authRouter.route("/login").get(getLogin).post(postLogin);

export default authRouter;
