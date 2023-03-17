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
        const parentPostingId = parentLetter.parentPostingId;
        const rootLetterId = parentLetter.rootLetterId;
        const letter = await Letter.create({
            senderId,
            receiverId,
            title,
            body,
            isRoot:false,
            parentPostingId,
            parentLetterId,
            rootLetterId,
        });
        const {childrenLetterIdArray} = await Letter.findById(rootLetterId,{_id:0, childrenLetterIdArray:1});
        childrenLetterIdArray.push(letter._id);
        await Letter.findByIdAndUpdate(rootLetterId, {childrenLetterIdArray:childrenLetterIdArray},{new:true})
        httpResponse.SUCCESS_OK(res, "", letter);
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const patchOneLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        const {
            title,
            body,
        } = req.body;
        const newLetter = await Letter.findByIdAndUpdate(
            letterId,
            {
                title,
                body,
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
        await Letter.findByIdAndUpdate(letterId,{
            isDeleted: true
        });
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
        const { rootLetterId } = await Letter.findById(letterId, {rootLetterId:1});
        const  letterIdArray  = await Letter.findById(rootLetterId, {_id:0, childrenLetterIdArray:1});
        const _letterArray = await letterIdArray.populate("childrenLetterIdArray");
        httpResponse.SUCCESS_OK(res, "", _letterArray);
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

export const likeLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        const letter = await Letter.findByIdAndUpdate(
            letterId,
            {
                $inc: { like: 1 }
            },
            { new: true }
        );
        return httpResponse.SUCCESS_OK(res, "", letter);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
