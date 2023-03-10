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
    body: { type: Sting },
    isLetterReply: { type: Boolean, default: false },
    isPostingReply: { type: Boolean, default: false },
    hasReply: { type: Boolean, default: false },
    parentPostingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    parentLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    daughterLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    isChecking: { type: Boolean, default: false },
});

const Letter = mongoose.model("Letter", letterSchema);
export default Letter;
