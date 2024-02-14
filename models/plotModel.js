const mongoose = require("mongoose");

const plotSchema = mongoose.Schema(
	{
		regId: {
			type: String,
			trim: true,
		},
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

plotSchema.virtual("plotTemperature", {
	ref: "Temperature",
	localField: "_id",
	foreignField: "plotId",
	justOne: false,
});
plotSchema.virtual("plotPh", {
	ref: "Ph",
	localField: "_id",
	foreignField: "plotId",
	justOne: false,
});

const Plot = new mongoose.model("Plot", plotSchema);

module.exports = Plot;
