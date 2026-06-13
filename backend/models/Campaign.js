import mongoose from "mongoose";

const campaignSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      template_id: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Template",
      },

      schedule_time: {
        type: Date,
      },

      status: {
        type: String,
        default: "Draft",
      },

      history: [
        {
          action: String,
          date: Date,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Campaign",
  campaignSchema
);