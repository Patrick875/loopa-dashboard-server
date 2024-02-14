const mongoose = require("mongoose");

const phSchema = mongoose.Schema(
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

const Ph = new mongoose.model("Ph", phSchema);

module.exports = Ph;
