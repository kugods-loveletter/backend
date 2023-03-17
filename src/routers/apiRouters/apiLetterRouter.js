import express from "express";
import {
    postOneLetter,
    getOneLetter,
    patchOneLetter,
    deleteOneLetter,
    getAllLettersArray,
    getParentLettersArray,
    getChildrenLettersArray,
    likeLetter,
    checkLetter,
} from "../../controllers/apiControllers/apiLetterController";

const apiLetterRouter = express.Router();

apiLetterRouter
    .route("/:letterId")
    .get(getOneLetter)
    .post(postOneLetter)
    .patch(patchOneLetter)
    .delete(deleteOneLetter);
apiLetterRouter.route("/:letterId/allLetters").get(getAllLettersArray);
apiLetterRouter.route("/:letterId/parentLetters").get(getParentLettersArray);
apiLetterRouter
    .route("/:letterId/ChildrenLetters")
    .get(getChildrenLettersArray);
apiLetterRouter
    .route("/:letterId/like")
    .patch(likeLetter);
apiLetterRouter
    .route("/:letterId/check")
    .patch(checkLetter);
export default apiLetterRouter;
