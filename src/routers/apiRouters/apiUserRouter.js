import express from "express";
const {
    getAllUsers,
    getOneUser,
    getUserSentLetters,
    getUserReceivedLetters,
} = require("../../controllers/apiControllers/apiUserController");

const apiUserRouter = require("express").Router();

apiUserRouter.route("/").get(getAllUsers);
apiUserRouter.route("/:userId").get(getOneUser);
apiUserRouter.route("/:userId/sent").get(getUserSentLetters);
apiUserRouter.route("/:userId/received").get(getUserReceivedLetters);

module.exports = { apiUserRouter };
