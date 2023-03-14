const { httpResponse } = require("../../config/http-response");
import Letter from "../../models/Letter";

export const getOneLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        const letterInfo = await Letter.findById(letterId);
        httpResponse.SUCCESS_OK(res, "", letterInfo);
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const postOneLetter = async (req, res) => {
    try {
        const parentLetterId = req.params.letterId;
        const parentLetter = await Letter.findById(parentLetterId);
        const { title, body } = req.body;
        const senderId = parentLetter.receiverId;
        const receiverId = parentLetter.senderId;
        const rootLetterId = parentLetter.rootLetterId;
        const letter = await Letter.create({
            senderId,
            receiverId,
            title,
            body,
            parentLetterId,
            rootLetterId,
        });
        httpResponse.SUCCESS_OK(res, "", letter);
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const patchOneLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        const {
            senderId,
            receiverId,
            title,
            body,
            isRoot,
            parentPostingId,
            parentLetterId,
            rootLetterId,
            childrenLetterIdArray,
            isChecking,
            like,
        } = req.body;
        const newLetter = await Letter.findByIdAndUpdate(
            letterId,
            {
                senderId,
                receiverId,
                title,
                body,
                isRoot,
                parentPostingId,
                parentLetterId,
                rootLetterId,
                childrenLetterIdArray,
                isChecking,
                like,
            },
            { new: true }
        );
        httpResponse.SUCCESS_OK(res, "", newLetter);
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const deleteOneLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        await Letter.findByIdAndDelete(letterId);
        httpResponse.SUCCESS_OK(
            res,
            `id가 ${letterId}인 letter를 삭제했습니다.`,
            {}
        );
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getAllLettersArray = async (req, res) => {
    try {
        const { letterId } = req.params;
        const { rootLetterId } = await Letter.find({ _id: letterId });
        const { letterIdArray } = await Letter.find({ _id: rootLetterId });
        const letterArray = await letterIdArray.populate("letterIdArray");
        httpResponse.SUCCESS_OK(res, "", { letterArray });
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getParentLettersArray = (req, res) => {
    try {
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getChildrenLettersArray = (req, res) => {
    try {
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};
