import express from "express";

import {
  createCampaign,
  getCampaigns,
  deleteCampaign,
   updateCampaign,
   cloneCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

router.post(
  "/",
  createCampaign
);

router.get(
  "/",
  getCampaigns
);

export default router;

router.delete(
  "/:id",
  deleteCampaign
);

router.put(
  "/:id",
  updateCampaign
);

router.post(
  "/:id/clone",
  cloneCampaign
);