const { httpResponse } = require("../../config/http-response");
const { Letter } = require("../../models/Letter");

const apiLetterController = {
    async getOneLetter(req, res) {
        try {
            const { letterId } = req.params;
            const letterInfo = await Letter.findById(letterId);
            return httpResponse.SUCCESS_OK(res, "", letterInfo);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async postOneLetter(req, res) {
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
                isRoot: false,
                parentPostingId,
                parentLetterId,
                rootLetterId,
            });
            const { childrenLetterIdArray } = await Letter.findById(
                rootLetterId,
                { _id: 0, childrenLetterIdArray: 1 }
            );
            childrenLetterIdArray.push(letter._id);
            await Letter.findByIdAndUpdate(
                rootLetterId,
                { childrenLetterIdArray: childrenLetterIdArray },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(res, "", letter);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async patchOneLetter(req, res) {
        try {
            const { letterId } = req.params;
            const { title, body } = req.body;
            const newLetter = await Letter.findByIdAndUpdate(
                letterId,
                {
                    title,
                    body,
                },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(res, "", newLetter);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async deleteOneLetter(req, res) {
        try {
            const { letterId } = req.params;
            await Letter.findByIdAndUpdate(letterId, {
                isDeleted: true,
            });
            return httpResponse.SUCCESS_OK(
                res,
                `id가 ${letterId}인 letter를 삭제했습니다.`,
                {}
            );
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async getAllLettersArray(req, res) {
        try {
            const { letterId } = req.params;
            const { rootLetterId } = await Letter.findById(letterId, {
                rootLetterId: 1,
            });
            const letterIdArray = await Letter.findById(rootLetterId, {
                _id: 0,
                childrenLetterIdArray: 1,
            });
            const _letterArray = await letterIdArray.populate(
                "childrenLetterIdArray"
            );
            return httpResponse.SUCCESS_OK(res, "", _letterArray);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    getParentLettersArray(req, res) {
        try {
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    getChildrenLettersArray(req, res) {
        try {
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async likeLetter(req, res) {
        try {
            const { letterId } = req.params;
            const letter = await Letter.findByIdAndUpdate(
                letterId,
                {
                    $inc: { like: 1 },
                },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(res, "", letter);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },

    async checkLetter(req, res) {
        try {
            const { letterId } = req.params;
            const { isChecking } = await Letter.findById(letterId, {
                _id: 0,
                isChecking: 1,
            });
            if (!isChecking) {
                await Letter.findByIdAndUpdate(letterId, { isChecking: true });
                var data = "신고 완료 되었습니다.";
            } else {
                var data = "이미 신고 되었습니다.";
            }
            return httpResponse.SUCCESS_OK(res, "", data);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
};

module.exports = apiLetterController;
