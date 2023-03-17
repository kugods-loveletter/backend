import express from "express";
import { getHome } from "../controllers/rootController";

import authRouter from "./authRouter";

import apiUserRouter from "./apiRouters/apiUserRouter";
import apiPostingRouter from "./apiRouters/apiPostingRouter";
import apiLetterRouter from "./apiRouters/apiLetterRouter";
import apiNoticeRouter from "./apiRouters/apiNoticeRouter";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

rootRouter.use("/auth", authRouter);

rootRouter.use("/api/user", apiUserRouter);
rootRouter.use("/api/posting", apiPostingRouter);
rootRouter.use("/api/letter", apiLetterRouter);
rootRouter.use("/api/notice", apiNoticeRouter);

export default rootRouter;
