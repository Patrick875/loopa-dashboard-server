const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const plotRoutes = require("./routes/plotRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.options("*", cors());

app.use("/", userRoutes);
app.use("/plots", plotRoutes);

module.exports = app;
