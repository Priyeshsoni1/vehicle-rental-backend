const prisma = require("../models/prismaClient");

exports.getAllVehicles = async (req, res) => {
  try {
    const { typeId } = req.params;
    const vehicles = await prisma.vehicle.findMany({
      where: { vehicleTypeId: parseInt(typeId) },
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
