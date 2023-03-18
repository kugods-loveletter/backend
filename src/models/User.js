const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pw: { type: String },
});

userSchema.pre("save", async function () {
    if (this.isModified("pw")) {
        this.pw = await bcrypt.hash(this.pw, 5);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
