const {
    getAllNotices,
    postOneNotice,
    getOneNotice,
    patchOneNotice,
    deleteOneNotice,
    likeNotice,
    checkNotice,
} = require("../../controllers/apiControllers/apiNoticeController");

const apiNoticeRouter = require("express").Router();

apiNoticeRouter.route("/").get(getAllNotices).post(postOneNotice);
apiNoticeRouter
    .route("/:noticeId")
    .get(getOneNotice)
    .patch(patchOneNotice)
    .delete(deleteOneNotice);
apiNoticeRouter.route("/:noticeId/like").patch(likeNotice);
apiNoticeRouter.route("/:noticeId/check").patch(checkNotice);

module.exports = { apiNoticeRouter };
