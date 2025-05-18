const prisma = require("../models/prismaClient");

exports.getAllVehicleTypes = async (req, res) => {
  try {
    const { wheels } = req.query;
    const types = await prisma.vehicleType.findMany({
      where: wheels ? { wheels: parseInt(wheels) } : {},
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
