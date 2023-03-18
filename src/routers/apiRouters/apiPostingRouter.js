const {
    getAllPostings,
    postOnePosting,
    getOnePosting,
    patchOnePosting,
    deleteOnePosting,
    getAllReplyLetters,
    postOneReplyLetter,
    likePosting,
    checkPosting,
} = require("../../controllers/apiControllers/apiPostingController");

const apiPostingRouter = require("express").Router();

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
apiPostingRouter.route("/:postingId/like").patch(likePosting);
apiPostingRouter.route("/:postingId/check").patch(checkPosting);

module.exports = { apiPostingRouter };
