import mongoose from "mongoose";
const letterSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: Sting },
    isChecking: { type: Boolean, default: false },
});

const Letter = mongoose.model("Letter", letterSchema);
export default Letter;
