import express from "express";
import { getHome } from "../controllers/rootController";
import apiRouter from "./apiRouter";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

rootRouter.use("/api", apiRouter);

export default rootRouter;
