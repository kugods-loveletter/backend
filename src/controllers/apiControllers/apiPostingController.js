const { httpResponse } = require("../../config/http-response");
const { ObjectId } = require("mongodb");
import User from "../../models/User";
import Posting from "../../models/Posting";

export const getAllPostings = async (req, res) => {
    try {
        const postings = await Posting.find({});
        return httpResponse.SUCCESS_OK(res, "", postings);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
export const postOnePosting = async (req, res) => {
    const userId = req.session.loggedInUser._id;
    const { title, body } = req.body;
    try {
        const posting = await Posting.create({
            userId,
            title,
            body,
        });
        return httpResponse.SUCCESS_OK(res, "", posting);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getOnePosting = async (req, res) => {
    try {
        const postingId = req.params.postingId;
        const postingInfo = await Posting.find({ _id: postingId });
        return httpResponse.SUCCESS_OK(res, "", postingInfo);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const patchOnePosting = async (req, res) => {
    try {
        const { postingId } = req.params;
        const { userId, title, body, replyLetterIdArray, isChecking, like } =
            req.body;
        const newPosting = await Letter.findByIdAndUpdate(
            postingId,
            {
                userId,
                title,
                body,
                replyLetterIdArray,
                isChecking,
                like,
            },
            { new: true }
        );
        return httpResponse.SUCCESS_OK(res, "", newPosting);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const deleteOnePosting = async (req, res) => {
    try {
        const { postingId } = req.params;
        await Posting.findByIdAndDelete(postingId);
        return httpResponse.SUCCESS_OK(
            res,
            "",
            `id가 ${postingId}인 posting을 삭제했습니다.`
        );
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getAllReplyLetters = (req, res) => {};

export const postOneReplyLetter = (req, res) => {};
