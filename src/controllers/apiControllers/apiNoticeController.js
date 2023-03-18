const { httpResponse } = require("../../config/http-response");
const { Notice } = require("../../models/Notice");

const apiNoticeController = {
    async getAllNotices(req, res) {
        try {
            const notices = await Notice.find({});
            return httpResponse.SUCCESS_OK(res, "", notices);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async postOneNotice(req, res) {
        try {
            const userId = req.session.loggedInUser._id;
            const { title, body } = req.body;
            const notice = await Notice.create({
                userId,
                title,
                body,
            });
            return httpResponse.SUCCESS_OK(res, "", notice);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async getOneNotice(req, res) {
        try {
            const noticeId = req.params.noticeId;
            const noticeInfo = await Notice.find({ _id: noticeId });
            return httpResponse.SUCCESS_OK(res, "", noticeInfo);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async patchOneNotice(req, res) {
        try {
            const { noticeId } = req.params;
            const { title, body } = req.body;
            const newNotice = await Notice.findByIdAndUpdate(
                noticeId,
                {
                    title,
                    body,
                },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(res, "", newNotice);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async deleteOneNotice(req, res) {
        try {
            const { noticeId } = req.params;
            await Notice.findByIdAndUpdate(
                noticeId,
                {
                    isDeleted: true,
                },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(
                res,
                "",
                `id가 ${noticeId}인 notice를 삭제했습니다.`
            );
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async likeNotice(req, res) {
        try {
            const { noticeId } = req.params;
            const notice = await Notice.findByIdAndUpdate(
                noticeId,
                {
                    $inc: { like: 1 },
                },
                { new: true }
            );
            return httpResponse.SUCCESS_OK(res, "", notice);
        } catch (error) {
            return httpResponse.BAD_REQUEST(res, "", error);
        }
    },
    async checkNotice(req, res) {
        try {
            const { noticeId } = req.params;
            const { isChecking } = await Notice.findById(noticeId, {
                _id: 0,
                isChecking: 1,
            });
            if (!isChecking) {
                await Notice.findByIdAndUpdate(noticeId, { isChecking: true });
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

module.exports = apiNoticeController;
