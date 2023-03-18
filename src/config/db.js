const mongoose = require("mongoose");

const handleDBConnect = () => {
    console.log("✅ Connected to DB");
};
const handleDBError = (error) => {
    console.log("❌ DB Error", error);
};

const connect = mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        dbName: "loveletter",
    })
    .then(handleDBConnect, handleDBError);

module.exports = { connect };
