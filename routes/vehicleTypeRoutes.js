const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleTypeController");
router.get("/", controller.getAllVehicleTypes);
module.exports = router;
