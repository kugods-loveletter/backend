const { httpResponse } = require("../../config/http-response");
const { ObjectId } = require("mongodb");
import Posting from "../../models/Posting";
import Letter from "../../models/Letter";

export const getAllPostings = async (req, res) => {
    try {
        const postings = await Posting.find({});
        return httpResponse.SUCCESS_OK(res, "", postings);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
export const postOnePosting = async (req, res) => {
    try {
        const userId = req.session.loggedInUser._id;
        const { title, body } = req.body;
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
        const newPosting = await Posting.findByIdAndUpdate(
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
        await Posting.findByIdAndUpdate(
            postingId,
            {
                isDeleted : true
            },
            { new: true }
        );
        return httpResponse.SUCCESS_OK(
            res,
            "",
            `id가 ${postingId}인 posting을 삭제했습니다.`
        );
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getAllReplyLetters = async (req, res) => {
    try {
        const parentPostingId = req.params.postingId;
        const letters = await Letter.find({parentPostingId:parentPostingId});
        return httpResponse.SUCCESS_OK(res, "", letters);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }

};

export const postOneReplyLetter = async (req, res) => {
    try {
        const parentPostingId = req.params.postingId;
        const senderId = req.session.loggedInUser._id;
        const receiverId = await Posting.findById(parentPostingId, "_userId");
        const { title, body } = req.body;
        const letter = await Letter.create({
            senderId,
            receiverId,
            title,
            body,
            isRoot:true,
            parentPostingId,
        });
        const _letter = await Letter.findByIdAndUpdate(letter._id,{ rootLetterId:letter._id },{ new: true })
        return httpResponse.SUCCESS_OK(res, "", _letter);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};



