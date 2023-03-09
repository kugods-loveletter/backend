import "dotenv/config";
import express from "express";
import "./db";

import session from "express-session";
import MongoStore from "connect-mongo";
import { saveSessionToLocal } from "./middleware";

import rootRouter from "./routers/rootRouter";

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
        }),
    })
);
app.use(saveSessionToLocal);

app.use("/", rootRouter);
