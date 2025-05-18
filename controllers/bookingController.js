const prisma = require("../models/prismaClient");

exports.createBooking = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
  try {
    const overlap = await prisma.booking.findFirst({
      where: {
        vehicleId: parseInt(vehicleId),
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (overlap)
      return res
        .status(400)
        .json({ message: "Vehicle already booked for selected dates" });

    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        vehicleId: parseInt(vehicleId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vehicle: true, // Include the related vehicle data
      },
    });
    res.status(200).json(bookings); // 200 for successful GET
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
