const Temperature = require("../models/temperature");
const Ph = require("../models/phModel");
const Plot = require("../models/plotModel");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
	const plots = await Plot.find()
		.populate({ path: "plotTemperature" })
		.populate({ path: "plotPh" });
	res.status(200).json({
		status: "success",
		results: plots.length,
		data: plots,
	});
});
exports.getOne = asyncHandler(async (req, res) => {
	let plot = await Plot.findOne({ cowId: req.params.id })
		.populate({ path: "temperature" })
		.populate({ path: "ph" })
		.exec();

	res.status(200).json({
		status: "success",
		data: plot,
	});
});
exports.create = asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({
			status: "Bad request",
			message: "plot id is required",
		});
	}

	await Plot.create({
		regId: name,
	});
	res.status(201).json({
		status: "success",
		message: "Plot registered",
	});
});
exports.recordCurrentData = asyncHandler(async (req, res) => {
	const { id, temp, ph } = req.query;

	let plot = await Plot.findOne({ regId: id });
	if (!plot) {
		plot = await Plot.create({ regId: id });
	}

	await Temperature.create({
		plotId: plot._id,
		value: temp,
		date: new Date(),
	});
	await Ph.create({
		plotId: plot._id,
		value: ph,
		date: new Date(),
	});

	res.status(201).json({
		status: "success",
		data: plot,
	});
});

exports.deletePlot = asyncHandler(async (req, res) => {
	await Plot.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
});

exports.deleteAll = asyncHandler(async (req, res) => {
	await Plot.deleteMany();
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
});
