import express from "express";

import {
  createTemplate,
  getTemplates,
  deleteTemplate,
  updateTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

router.post(
  "/",
  createTemplate
);

router.get(
  "/",
  getTemplates
);

export default router;

router.delete(
  "/:id",
  deleteTemplate
);

router.put(
  "/:id",
  updateTemplate
);