import mongoose from "mongoose";

const scheduleSchema =
  new mongoose.Schema(
    {
      campaignName: {
        type: String,
        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Schedule",
  scheduleSchema
);