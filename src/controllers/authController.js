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

export const postSignup = async (req, res) => {
    const { id, email, pw, confirmPw } = req.body;
    if (pw !== confirmPw) {
        return httpResponse.BAD_REQUEST(
            res,
            "",
            "비밀번호와 확인 비밀번호가 같지 않습니다."
        );
    }
    const exists = await User.exists({ $or: [{ id }, { email }] });
    if (exists) {
        return httpResponse.BAD_REQUEST(
            res,
            "",
            "입력하신 이메일 또는 아이디를 가진 다른 계정이 이미 존재합니다."
        );
    }
    try {
        const user = await User.create({
            id,
            email,
            pw,
        });
        loginUserToSession(req, user);
        return httpResponse.SUCCESS_OK(res, "", user);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getLogin = (req, res) => {
    return res.send("로그인 페이지 구현을 위한 URL");
};

