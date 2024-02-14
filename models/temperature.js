const mongoose = require("mongoose");

const temperatureSchema = mongoose.Schema(
	{
		plotId: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "plot is required"],
		},
		value: { type: Number, default: 0 },
	},
	{
		timestamps: true,

		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

const Temperature = new mongoose.model("Temperature", temperatureSchema);

module.exports = Temperature;
