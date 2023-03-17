import express from "express";
import {
    getAllPostings,
    postOnePosting,
    getOnePosting,
    patchOnePosting,
    deleteOnePosting,
    getAllReplyLetters,
    postOneReplyLetter,
    likePosting,
    checkPosting,
} from "../../controllers/apiControllers/apiPostingController";

const apiPostingRouter = express.Router();

apiPostingRouter.route("/").get(getAllPostings).post(postOnePosting);
apiPostingRouter
    .route("/:postingId")
    .get(getOnePosting)
    .patch(patchOnePosting)
    .delete(deleteOnePosting);
apiPostingRouter
    .route("/:postingId/replyLetter")
    .get(getAllReplyLetters)
    .post(postOneReplyLetter);
apiPostingRouter
    .route("/:postingId/like")
    .patch(likePosting);
apiPostingRouter
    .route("/:postingId/check")
    .patch(checkPosting);
export default apiPostingRouter;
