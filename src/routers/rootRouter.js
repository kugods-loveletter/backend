import express from "express";
import { getHome } from "../controllers/rootController";

import authRouter from "./authRouter";

import apiUserRouter from "./apiRouters/apiUserRouter";
import apiPostingRouter from "./apiRouters/apiPostingRouter";
import apiLetterRouter from "./apiRouters/apiLetterRouter";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

rootRouter.use("/auth", authRouter);

rootRouter.use("/api/user", apiUserRouter);
rootRouter.use("/api/posting", apiPostingRouter);
rootRouter.use("/api/letter", apiLetterRouter);

export default rootRouter;
