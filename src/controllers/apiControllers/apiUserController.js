const { httpResponse } = require("../../config/http-response");
const { User } = require("../../models/User");
const { Letter } = require("../../models/Letter");

const apiUserController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            return httpResponse.SUCCESS_OK(res, "", users);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async getOneUser(req, res) {
        const userId = req.params.userId;
        try {
            const user = await User.find({ _id: userId });
            return httpResponse.SUCCESS_OK(res, "", user);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async getUserSentLetters(req, res) {
        const userId = req.params.userId;

        try {
            const letterArray = await Letter.find({ senderId: userId });
            return httpResponse.SUCCESS_OK(res, "", letterArray);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async getUserReceivedLetters(req, res) {
        const userId = req.params.userId;
        try {
            const letterArray = await Letter.find({ receiverId: userId });
            return httpResponse.SUCCESS_OK(res, "", letterArray);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
};

module.exports = apiUserController;
