import { useState } from "react";

import {
  deleteCampaign,
  updateCampaign,
  cloneCampaign,
} from "../../services/campaignService";

import StatusBadge from "./StatusBadge";
import CampaignHistory from "./CampaignHistory";

const CampaignTable = ({
  campaigns,
  setCampaigns,
}) => {
  const [
    selectedHistory,
    setSelectedHistory,
  ] = useState([]);

  const handleDeleteCampaign =
    async (id) => {
      try {
        await deleteCampaign(id);

        setCampaigns(
          campaigns.filter(
            (campaign) =>
              campaign._id !== id
          )
        );

        alert(
          "Campaign Deleted"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleCloneCampaign =
    async (id) => {
      try {
        const cloned =
          await cloneCampaign(id);

        setCampaigns([
          ...campaigns,
          cloned,
        ]);

        alert(
          "Campaign Cloned"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const scheduleCampaign =
    async (id) => {
      try {
        const currentCampaign =
          campaigns.find(
            (campaign) =>
              campaign._id === id
          );

        const updatedCampaign =
          await updateCampaign(
            id,
            {
              ...currentCampaign,
              status:
                "Scheduled",
            }
          );

        setCampaigns(
          campaigns.map(
            (campaign) =>
              campaign._id === id
                ? updatedCampaign
                : campaign
          )
        );

        alert(
          "Campaign Scheduled Successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed To Schedule Campaign"
        );
      }
    };

  return (
    <div className="card">
      <h2>
        Campaign List
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Subject</th>

            <th>Status</th>

            <th>
              History Count
            </th>

            <th>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map(
            (campaign) => (
              <tr
                key={
                  campaign._id
                }
              >
                <td>
                  {
                    campaign.title
                  }
                </td>

                <td>
                  {
                    campaign.subject
                  }
                </td>

                <StatusBadge
                  status={
                    campaign.status
                  }
                />

                <td>
                  {campaign
                    .history
                    ?.length ||
                    0}
                </td>

                <td>
                  <button
                  className="btn-schedule"
                    onClick={() =>
                      scheduleCampaign(
                        campaign._id
                      )
                    }
                  >
                    Schedule
                  </button>

                  <button
                  className="btn-delete"
                    onClick={() =>
                      handleDeleteCampaign(
                        campaign._id
                      )
                    }
                  >
                    Delete
                  </button>

                  <button
                   className="btn-clone"
                    onClick={() =>
                      handleCloneCampaign(
                        campaign._id
                      )
                    }
                  >
                    Clone
                  </button>

                  <button
                    onClick={() =>
                      setSelectedHistory(
                        campaign.history
                      )
                    }
                  >
                    History
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <CampaignHistory
        history={
          selectedHistory
        }
      />
    </div>
  );
};

export default CampaignTable;