const { httpResponse } = require("../../config/http-response");
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
        const { title, body, category } = req.body;
        const posting = await Posting.create({
            userId,
            title,
            body,
            category,
        });
        const postingWithUserInfo = await posting.populate("userId");
        return httpResponse.SUCCESS_OK(res, "", postingWithUserInfo);
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
        const { title, body } = req.body;
        const newPosting = await Posting.findByIdAndUpdate(
            postingId,
            {
                title,
                body,
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
                isDeleted: true,
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
        const letters = await Posting.findById(parentPostingId, {
            _id: 0,
            replyLetterIdArray: 1,
        });
        console.log(letters);
        const letterArray = await letters.populate("replyLetterIdArray");
        return httpResponse.SUCCESS_OK(res, "", letterArray);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const postOneReplyLetter = async (req, res) => {
    try {
        const parentPostingId = req.params.postingId;
        const senderId = req.session.loggedInUser._id;
        const receiverId = await Posting.findById(parentPostingId, {
            _id: 0,
            userId: 1,
        });
        const { title, body } = req.body;
        const letter = await Letter.create({
            senderId,
            receiverId: receiverId.userId,
            title,
            body,
            isRoot: true,
            parentPostingId,
        });
        const _letter = await Letter.findByIdAndUpdate(
            letter._id,
            {
                rootLetterId: letter._id,
                childrenLetterIdArray: letter._id,
            },
            { new: true }
        );

        const { replyLetterIdArray } = await Posting.findById(parentPostingId, {
            _id: 0,
            replyLetterIdArray: 1,
        });
        replyLetterIdArray.push(letter._id);
        await Posting.findByIdAndUpdate(
            parentPostingId,
            { replyLetterIdArray: replyLetterIdArray },
            { new: true }
        );
        return httpResponse.SUCCESS_OK(res, "", _letter);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const likePosting = async (req, res) => {
    try {
        const { postingId } = req.params;
        const posting = await Posting.findByIdAndUpdate(
            postingId,
            {
                $inc: { like: 1 },
            },
            { new: true }
        );
        return httpResponse.SUCCESS_OK(res, "", posting);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const checkPosting = async (req, res) => {
    try {
        const { postingId } = req.params;
        const { isChecking } = await Posting.findById(postingId, {
            _id: 0,
            isChecking: 1,
        });
        if (!isChecking) {
            await Posting.findByIdAndUpdate(postingId, { isChecking: true });
            var data = "신고 완료 되었습니다.";
        } else {
            var data = "이미 신고 되었습니다.";
        }
        return httpResponse.SUCCESS_OK(res, "", data);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
