const { httpResponse } = require("../config/http-response");

import User from "../models/User";
import bcrypt from "bcrypt";

const loginUserToSession = (req, user) => {
    req.session.isLoggedIn = true;
    req.session.loggedInUser = user;
};

export const getSignup = (req, res) => {
    return res.send("회원가입 페이지 구현을 위한 URL");
};

