import express from "express";
import {
    postOneLetter,
    getOneLetter,
    patchOneLetter,
    deleteOneLetter,
    getAllLettersArray,
    getParentLettersArray,
    getChildrenLettersArray,
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

export default apiLetterRouter;
