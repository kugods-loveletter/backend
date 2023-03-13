import mongoose from "mongoose";
const letterSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
    isFromPosting: { type: Boolean, default: false },
    isRoot: { type: Boolean, default: false },
    parentPostingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    rootLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
        required: true,
    },
    childrenLetterIdArray: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Letter" },
    ],
    isChecking: { type: Number, default: false },
});

const Letter = mongoose.model("Letter", letterSchema);
export default Letter;
