import express from "express";
import {
    getAllNotices,
    postOneNotice,
    getOneNotice,
    patchOneNotice,
    deleteOneNotice,
    likeNotice,
    checkNotice,
} from "../../controllers/apiControllers/apiNoticeController";

const apiNoticeRouter = express.Router();

apiNoticeRouter.route("/").get(getAllNotices).post(postOneNotice);
apiNoticeRouter
    .route("/:noticeId")
    .get(getOneNotice)
    .patch(patchOneNotice)
    .delete(deleteOneNotice);
apiNoticeRouter
    .route("/:noticeId/like")
    .patch(likeNotice);
apiNoticeRouter
    .route("/:noticeId/check")
    .patch(checkNotice);
export default apiNoticeRouter;
