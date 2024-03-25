//jshint esversion:9
const asyncHandler = require("../utils/asyncHandler");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};
const sendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);
	const cookieOptions = {
		expire: new Date(Date.now()) + process.env.JWT_EXPIRATION_NUM,
	};

	res.cookie("jwt", token, cookieOptions);
	user.password = undefined;
	res.status(statusCode).json({
		status: "Success",
		token,
		user,
	});
};
exports.getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();
	res.status(200).json({
		results: users.length,
		users: users,
	});
});
exports.signup = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = await User.create({
		fullname: req.body.fullname,
		email: req.body.email,
		password: hashedPassword,
		telephone: req.body.telephone,
	});

	sendToken(newUser, 201, req, res);
});
exports.login = asyncHandler(async (req, res, next) => {
	const { password, userCredentials } = req.body;
	if (!userCredentials || !password) {
		return res.status(401).json({
			status: "fail",
			message: "to login please provide both the email and the password",
		});
	}
	const user = await User.findOne({
		$or: [{ email: userCredentials }, { telephone: userCredentials }],
	}).select("+password");

	const passwordCompare = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!user || !passwordCompare) {
		return res.status(400).json({
			status: "fail",
			message: "incorrect email or password",
		});
	}

	sendToken(user, 200, req, res);
});

exports.logout = asyncHandler((req, res) => {
	res.cookie("jwt", "", {
		maxAge: 300,
	});
	res.status(200).json({
		status: "success",
		message: "logedout",
	});
});
