import express from "express";

import {
  createSchedule,
  getSchedules,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.post(
  "/",
  createSchedule
);

router.get(
  "/",
  getSchedules
);

router.delete(
  "/:id",
  deleteSchedule
);

export default router;