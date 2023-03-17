import express from "express";
import {
    getAllNotices,
    postOneNotice,
    getOneNotice,
    patchOneNotice,
    deleteOneNotice,
    likeNotice,
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
export default apiNoticeRouter;
