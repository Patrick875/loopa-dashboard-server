const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const plotRoutes = require("./routes/plotRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use(cors({ origin: "https://genuine-arithmetic-b0c8ef.netlify.app/" }));
app.options("*", cors());

app.use("/api/v1/", userRoutes);
app.use("/api/v1/plots", plotRoutes);

module.exports = app;
