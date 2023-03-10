import express from "express";
import {
    getAllPostings,
    postOnePosting,
    getOnePosting,
    patchOnePosting,
    deleteOnePosting,
    getAllReplyLetters,
    postOneReplyLetter,
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
export default apiPostingRouter;
