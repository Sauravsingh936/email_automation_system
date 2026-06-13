import api from "./api";

export const getCampaigns = async () => {
  try {
    const response = await api.get(
      "/campaigns"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error Fetching Campaigns:",
      error
    );

    return [];
  }
};

export const createCampaign =
  async (campaign) => {
    try {
      const response =
        await api.post(
          "/campaigns",
          {
            ...campaign,
            status: "Created",
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Error Creating Campaign:",
        error
      );

      throw error;
    }
  };

export const saveDraft = async (
  campaign
) => {
  try {
    const response =
      await api.post(
        "/campaigns",
        {
          ...campaign,
          status: "Draft",
        }
      );

    return response.data;
  } catch (error) {
    console.error(
      "Error Saving Draft:",
      error
    );

    throw error;
  }
};

export const deleteCampaign =
  async (id) => {
    const response =
      await api.delete(
        `/campaigns/${id}`
      );

    return response.data;
  };

export const updateCampaign =
  async (
    id,
    campaignData
  ) => {
    const response =
      await api.put(
        `/campaigns/${id}`,
        campaignData
      );

    return response.data;
  };  

export const cloneCampaign =
  async (id) => {
    const response =
      await api.post(
        `/campaigns/${id}/clone`
      );

    return response.data;
  };  
