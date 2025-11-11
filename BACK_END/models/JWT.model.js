const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
	jti: { type: String, required: true, unique: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	isRevoked: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now, expires: "1h" }
});

module.exports = mongoose.model("Token", tokenSchema);
