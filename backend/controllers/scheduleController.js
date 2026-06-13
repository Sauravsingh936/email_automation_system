import Schedule from "../models/Schedule.js";

export const createSchedule =
  async (req, res) => {
    try {
      const schedule =
        await Schedule.create(
          req.body
        );

      res.status(201).json(
        schedule
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getSchedules =
  async (req, res) => {
    try {
      const schedules =
        await Schedule.find();

      res.json(schedules);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteSchedule =
  async (req, res) => {
    try {
      const schedule =
        await Schedule.findByIdAndDelete(
          req.params.id
        );

      if (!schedule) {
        return res.status(404).json({
          message:
            "Schedule Not Found",
        });
      }

      res.json({
        message:
          "Schedule Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };