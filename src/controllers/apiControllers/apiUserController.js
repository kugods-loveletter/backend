const { httpResponse } = require("../../config/http-response");
import User from "../../models/User";
import Letter from "../../models/Letter";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return httpResponse.SUCCESS_OK(res, "", users);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getOneUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.find({ _id: userId });
        return httpResponse.SUCCESS_OK(res, "", user);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getUserSentLetters = async (req, res) => {
    try {
        const senderId = req.session.loggedInUser._id;
        const letterArray = await Letter.find({ senderId });
        return httpResponse.SUCCESS_OK(res, "", letterArray);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getUserReceivedLetters = async (req, res) => {
    try {
        const receiverId = req.session.loggedInUser._id;
        const letterArray = await Letter.find({ receiverId });
        return httpResponse.SUCCESS_OK(res, "", letterArray);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
