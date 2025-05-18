const prisma = require("../models/prismaClient");

async function main() {
  // Delete old data
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();

  // Insert types
  const [
    hatchback,
    suv,
    sedan,
    cruiser,
    sports,
    pickup,
    electric,
    convertible,
  ] = await Promise.all([
    prisma.vehicleType.create({ data: { name: "Hatchback", wheels: 4 } }),
    prisma.vehicleType.create({ data: { name: "SUV", wheels: 4 } }),
    prisma.vehicleType.create({ data: { name: "Sedan", wheels: 4 } }),
    prisma.vehicleType.create({ data: { name: "Cruiser", wheels: 2 } }),
    prisma.vehicleType.create({ data: { name: "Sports", wheels: 2 } }),
    prisma.vehicleType.create({ data: { name: "Pickup Truck", wheels: 4 } }),
    prisma.vehicleType.create({ data: { name: "Electric", wheels: 4 } }),
    prisma.vehicleType.create({ data: { name: "Convertible", wheels: 4 } }),
  ]);

  // Vehicles
  await prisma.vehicle.createMany({
    data: [
      // Hatchbacks
      { model: "Swift", pricePerDay: 500, vehicleTypeId: hatchback.id },
      { model: "i10", pricePerDay: 480, vehicleTypeId: hatchback.id },
      { model: "Baleno", pricePerDay: 530, vehicleTypeId: hatchback.id },

      // SUVs
      { model: "Thar", pricePerDay: 800, vehicleTypeId: suv.id },
      { model: "XUV700", pricePerDay: 850, vehicleTypeId: suv.id },
      { model: "Fortuner", pricePerDay: 1000, vehicleTypeId: suv.id },

      // Sedans
      { model: "Verna", pricePerDay: 700, vehicleTypeId: sedan.id },
      { model: "City", pricePerDay: 720, vehicleTypeId: sedan.id },
      { model: "Ciaz", pricePerDay: 690, vehicleTypeId: sedan.id },

      // Cruisers
      { model: "Harley", pricePerDay: 600, vehicleTypeId: cruiser.id },
      { model: "Avenger", pricePerDay: 550, vehicleTypeId: cruiser.id },

      // Sports Bikes
      { model: "Ducati", pricePerDay: 750, vehicleTypeId: sports.id },
      { model: "Yamaha R15", pricePerDay: 620, vehicleTypeId: sports.id },

      // Pickup Trucks
      { model: "Isuzu D-Max", pricePerDay: 900, vehicleTypeId: pickup.id },
      { model: "Toyota Hilux", pricePerDay: 950, vehicleTypeId: pickup.id },

      // Electric Cars
      { model: "Tata Nexon EV", pricePerDay: 700, vehicleTypeId: electric.id },
      { model: "MG ZS EV", pricePerDay: 720, vehicleTypeId: electric.id },

      // Convertibles
      {
        model: "Mini Cooper Convertible",
        pricePerDay: 1100,
        vehicleTypeId: convertible.id,
      },
      { model: "BMW Z4", pricePerDay: 1300, vehicleTypeId: convertible.id },
    ],
  });

  const vehicles = await prisma.vehicle.findMany({
    take: 3, // get first 3 vehicles for example
  });

  // Insert Bookings
  await prisma.booking.createMany({
    data: [
      {
        firstName: "Priyesh",
        lastName: "Singh",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-05"),
        vehicleId: vehicles[0].id,
      },
      {
        firstName: "Anjali",
        lastName: "Sharma",
        startDate: new Date("2025-06-10"),
        endDate: new Date("2025-06-15"),
        vehicleId: vehicles[1].id,
      },
      {
        firstName: "Ravi",
        lastName: "Verma",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-03"),
        vehicleId: vehicles[2].id,
      },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
