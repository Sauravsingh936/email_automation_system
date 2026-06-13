import Template from "../models/Template.js";

export const createTemplate =
  async (req, res) => {
    try {
      const template =
        await Template.create(
          req.body
        );

      res.status(201).json(
        template
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getTemplates =
  async (req, res) => {
    const templates =
      await Template.find();

    res.json(templates);
  };

export const deleteTemplate = async (
  req,
  res
) => {
  try {
    const template =
      await Template.findByIdAndDelete(
        req.params.id
      );

    if (!template) {
      return res.status(404).json({
        message:
          "Template Not Found",
      });
    }

    res.json({
      message:
        "Template Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  

export const updateTemplate = async (
  req,
  res
) => {
  try {
    const template =
      await Template.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!template) {
      return res.status(404).json({
        message:
          "Template Not Found",
      });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};