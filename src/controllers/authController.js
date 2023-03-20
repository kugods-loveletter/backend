const { httpResponse } = require("../config/http-response");

import User from "../models/User";
import bcrypt from "bcrypt";

const loginUserToSession = (req, user) => {
    req.session.isLoggedIn = true;
    req.session.loggedInUser = user;
    req.session.save();
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

export const postLogin = async (req, res) => {
    const { id, pw } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        return httpResponse.BAD_REQUEST(res, "", "계정이 존재하지 않습니다.");
    } else {
        const ok = await bcrypt.compare(pw, user.pw);
        if (!ok) {
            return httpResponse.BAD_REQUEST(
                res,
                "",
                "비밀번호가 올바르지 않습니다."
            );
        } else {
            loginUserToSession(req, user);
            console.log(req.session.loggedInUser);
            return httpResponse.SUCCESS_OK(res, "", user);
        }
    }
};

export const getLogout = async (req, res) => {
    try {
        req.session.destroy();
        return httpResponse.SUCCESS_OK(res, "", "로그아웃 완료되었습니다.");
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getLoggedInUser = async (req, res) => {
    try {
        const userId = req.session.isLoggedIn;
        const { isLoggedIn } = req.session;
        if (isLoggedIn) {
            const { loggedInUser } = req.session;
            return httpResponse.SUCCESS_OK(res, "", loggedInUser);
        } else {
            return httpResponse.SUCCESS_OK(
                res,
                "",
                "로그인 되어있는 유저가 없습니다"
            );
        }
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
