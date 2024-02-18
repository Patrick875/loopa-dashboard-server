const mongoose = require("mongoose");

const moistureSchema = mongoose.Schema(
	{
		plotId: {
			type: mongoose.Schema.Types.ObjectId,
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

const Moisture = new mongoose.model("Moisture", moistureSchema);

module.exports = Moisture;
