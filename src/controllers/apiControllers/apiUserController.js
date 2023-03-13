const { httpResponse } = require("../../config/http-response");
import User from "../../models/User";
import Letter from "../../models/Letter";

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find( null, {"_id":true} );
        return httpResponse.SUCCESS_OK(res, "", user);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getOneUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.find({_id: `${id}`});
        return httpResponse.SUCCESS_OK(res, "", user);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getUserSentLetters = async (req, res) => {
    const { id } = req.params.userId;
    try {
        const letterId = await Letter.find({senderId: `${id}`}, {_id:true});  
        return httpResponse.SUCCESS_OK(res, "", letterId);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getUserReceivedLetters = async (req, res) => {
    const { id } = req.params.userId;
    try {
        const letterId = await Letter.find({receiverId: `${id}`}, {_id:true});  
        return httpResponse.SUCCESS_OK(res, "", letterId);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
