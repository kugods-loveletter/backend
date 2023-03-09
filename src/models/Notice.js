import mongoose from "mongoose";
const noticeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
