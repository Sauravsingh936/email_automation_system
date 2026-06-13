import mongoose from "mongoose";

const templateSchema =
  new mongoose.Schema(
    {
      template_name: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      html_content: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        default: "Marketing",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Template",
  templateSchema
);