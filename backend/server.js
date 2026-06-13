import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import templateRoutes from "./routes/templateRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/templates", templateRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use(
  "/api/schedules",
  scheduleRoutes
);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(
        `Server Running On Port ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();