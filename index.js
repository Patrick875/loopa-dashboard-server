const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

const app = require("./app");

const PORT = process.env.PORT || 5200;
const DB = process.env.LOCAL_DATABASE_URL;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log("DB connection successful");
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.name, err.message);
	});
