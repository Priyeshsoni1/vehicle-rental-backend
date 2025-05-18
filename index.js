const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

//routes
app.use("/vehicles", require("./routes/vehicleRoutes"));
app.use("/vehicle-types", require("./routes/vehicleTypeRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
