const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
    isChecking: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
});

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = { Notice };
