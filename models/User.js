const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "You need to choose a username!"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "You need to provide your email!"],
			unique: true,
			match: [/^\S+@\S+\.\S+$/, "Email address not valid!"],
		},
		password: {
			type: String,
			required: [true, "You need to choose a password!"],
			minlength: [8, "Password needs to be at least 8 digits!"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
