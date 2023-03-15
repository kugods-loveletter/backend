import express from "express";
import {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/signup").post(postSignup);
authRouter.route("/login").post(postLogin);

export default authRouter;
