//jshint esversion:9
const express = require("express");
const plotController = require("./../controllers/plotController");

const router = express.Router();

router.post("/add", plotController.create);
router.post("/", plotController.recordCurrentData);
router.get("/all", plotController.getAll);

router.delete("/", plotController.deleteAll);
router
	.route("/:id")
	.get(plotController.getOne)
	.delete(plotController.deletePlot);

module.exports = router;
