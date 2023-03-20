import express from "express";
import {
    postSignup,
    postLogin,
    getLogout,
    getLoggedInUser,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/signup").post(postSignup);
authRouter.route("/login").post(postLogin);
authRouter.route("/logout").get(getLogout);
authRouter.route("/loggedInUser").get(getLoggedInUser);

export default authRouter;
