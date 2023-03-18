const { getHome } = require("../controllers/rootController");

const { authRouter } = require("./authRouter");
const { apiUserRouter } = require("./apiRouters/apiUserRouter");
const { apiPostingRouter } = require("./apiRouters/apiPostingRouter");
const { apiLetterRouter } = require("./apiRouters/apiLetterRouter");
const { apiNoticeRouter } = require("./apiRouters/apiNoticeRouter");

const rootRouter = require("express").Router();

rootRouter.route("/").get(getHome);

rootRouter.use("/auth", authRouter);

rootRouter.use("/api/user", apiUserRouter);
rootRouter.use("/api/posting", apiPostingRouter);
rootRouter.use("/api/letter", apiLetterRouter);
rootRouter.use("/api/notice", apiNoticeRouter);

module.exports = { rootRouter };
