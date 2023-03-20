import express from "express";
import {
    getAllUsers,
    getOneUser,
    getUserSentLetters,
    getUserReceivedLetters,
} from "../../controllers/apiControllers/apiUserController";

const apiUserRouter = express.Router();

apiUserRouter.route("/").get(getAllUsers);
apiUserRouter.route("/sent").get(getUserSentLetters);
apiUserRouter.route("/received").get(getUserReceivedLetters);
apiUserRouter.route("/:userId").get(getOneUser);

export default apiUserRouter;
