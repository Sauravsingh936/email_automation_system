import Campaign from "../models/Campaign.js";

export const createCampaign =
  async (req, res) => {
    try {
      const campaign =
        await Campaign.create({
          ...req.body,

          history: [
            {
              action:
                req.body.status ||
                "Created",

              date: new Date(),
            },
          ],
        });

      res.status(201).json(
        campaign
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getCampaigns =
  async (req, res) => {
    const campaigns =
      await Campaign.find();

    res.json(campaigns);
  };

export const deleteCampaign = async (
  req,
  res
) => {
  try {
    const campaign =
      await Campaign.findByIdAndDelete(
        req.params.id
      );

    if (!campaign) {
      return res.status(404).json({
        message:
          "Campaign Not Found",
      });
    }

    res.json({
      message:
        "Campaign Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  

export const updateCampaign =
  async (req, res) => {
    try {
      const campaign =
        await Campaign.findById(
          req.params.id
        );

      if (!campaign) {
        return res.status(404).json({
          message:
            "Campaign Not Found",
        });
      }

      campaign.title =
        req.body.title ||
        campaign.title;

      campaign.subject =
        req.body.subject ||
        campaign.subject;

      campaign.template_id =
        req.body.template_id ||
        campaign.template_id;

      campaign.status =
        req.body.status ||
        campaign.status;

      if (req.body.status) {
        campaign.history.push({
          action:
            req.body.status,
          date: new Date(),
        });
      }

      await campaign.save();

      res.json(campaign);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
export const cloneCampaign =
  async (req, res) => {
    try {
      const campaign =
        await Campaign.findById(
          req.params.id
        );

      if (!campaign) {
        return res.status(404).json({
          message:
            "Campaign Not Found",
        });
      }

      const cloned =
        await Campaign.create({
          title:
            campaign.title +
            " Copy",

          subject:
            campaign.subject,

          template_id:
            campaign.template_id,

          status: "Draft",

          history: [
            {
              action:
                "Cloned",
              date: new Date(),
            },
          ],
        });

      res.status(201).json(
        cloned
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };