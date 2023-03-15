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
    isRoot: { type: Boolean, default: false },
    parentPostingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posting",
    },
    parentLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    rootLetterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
    },
    childrenLetterIdArray: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Letter" },
    ],
    isChecking: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
});

const Letter = mongoose.model("Letter", letterSchema);
export default Letter;
