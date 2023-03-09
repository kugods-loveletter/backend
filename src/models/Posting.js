import mongoose from "mongoose";
const postingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String },
    body: { type: String },
});

const Posting = mongoose.model("Potice", postingSchema);
export default Posting;
