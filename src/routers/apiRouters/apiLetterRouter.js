import express from "express";
import {
    getOneLetter,
    patchOneLetter,
    deleteOneLetter,
    getAllLettersArray,
    getParentLettersArray,
    getDaughterLettersArray,
} from "../../controllers/apiControllers/apiLetterController";

const apiLetterRouter = express.Router();

apiLetterRouter
    .route("/:letterId")
    .get(getOneLetter)
    .patch(patchOneLetter)
    .delete(deleteOneLetter);
apiLetterRouter.route("/:letterId/allLetters").get(getAllLettersArray);
apiLetterRouter.route("/:letterId/parentLetters").get(getParentLettersArray);
apiLetterRouter
    .route("/:letterId/daughterLetters")
    .get(getDaughterLettersArray);

export default apiLetterRouter;
