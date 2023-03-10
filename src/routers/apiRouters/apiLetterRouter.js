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
apiLetterRouter.route("/:letterId/allLettersArray").get(getAllLettersArray);
apiLetterRouter
    .route("/:letterId/parentLettersArray")
    .get(getParentLettersArray);
apiLetterRouter
    .route("/:letterId/daughterLettersArray")
    .get(getDaughterLettersArray);

export default apiLetterRouter;
