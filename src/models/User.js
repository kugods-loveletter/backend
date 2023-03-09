import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    pw: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
