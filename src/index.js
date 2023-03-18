require("dotenv").config();
const express = require("express");
const { connect } = require("./config/db.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const { saveSessionToLocal } = require("./middleware");

const { rootRouter } = require("./routers/rootRouter");

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
