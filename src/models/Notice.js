import mongoose from "mongoose";
const noticeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
    isChecking: { type: Number },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
