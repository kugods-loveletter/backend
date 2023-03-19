import mongoose from "mongoose";
const postingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
    category: { type: String },
    replyLetterIdArray: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Letter" },
    ],
    isChecking: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
});

const Posting = mongoose.model("Posting", postingSchema);
export default Posting;
