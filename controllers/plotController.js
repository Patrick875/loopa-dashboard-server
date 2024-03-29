const Temperature = require("../models/temperature");
const Ph = require("../models/phModel");
const Plot = require("../models/plotModel");
const Moisture = require("../models/moistureModal");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
	const plots = await Plot.find()
		.populate({ path: "plotTemperature" })
		.populate({ path: "plotPh" })
		.populate({ path: "plotMoisture" });
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
	const { id, temp, ph, moisture } = req.body;

	let plot = await Plot.findOne({ regId: id });
	if (!plot) {
		plot = await Plot.create({ regId: id });
	}
	const date = new Date();

	await Temperature.create({
		plotId: plot._id,
		value: temp,
		date: date,
	});
	await Ph.create({
		plotId: plot._id,
		value: ph,
		date: date,
	});
	await Moisture.create({
		plotId: plot._id,
		value: moisture,
		date: date,
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
	await Ph.deleteMany();
	await Temperature.deleteMany();
	await Moisture.deleteMany();
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
});
