import express from "express";
import {
    getAllUsers,
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    getOneUser,
    getUserSentLetters,
    getUserReceivedLetters,
} from "../../controllers/apiControllers/apiUserController";

const apiUserRouter = express.Router();

apiUserRouter.route("/").get(getAllUsers);
apiUserRouter.route("/signup").get(getSignup).post(postSignup);
apiUserRouter.route("/login").get(getLogin).post(postLogin);
apiUserRouter.route("/:userId").get(getOneUser);
apiUserRouter.route("/:userId/sent").get(getUserSentLetters);
apiUserRouter.route("/:userId/received").get(getUserReceivedLetters);

export default apiUserRouter;
