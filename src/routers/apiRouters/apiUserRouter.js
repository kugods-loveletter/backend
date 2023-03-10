import express from "express";
import {
    getAllUsers,
    getOneUser,
    getUserSentLetters,
    getUserReceivedLetters,
} from "../../controllers/apiControllers/apiUserController";

const apiUserRouter = express.Router();

apiUserRouter.route("/").get(getAllUsers);
apiUserRouter.route("/:userId").get(getOneUser);
apiUserRouter.route("/:userId/sent").get(getUserSentLetters);
apiUserRouter.route("/:userId/received").get(getUserReceivedLetters);

export default apiUserRouter;
