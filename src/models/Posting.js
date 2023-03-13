import mongoose from "mongoose";
const postingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
    replyLetterIdArray: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Letter" },
    ],
    isChecking: { type: Number },
});

const Posting = mongoose.model("Potice", postingSchema);
export default Posting;
