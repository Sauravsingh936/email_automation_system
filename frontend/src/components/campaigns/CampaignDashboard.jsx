import {
  useEffect,
  useState,
} from "react";

import CampaignForm from "./CampaignForm";
import CampaignTable from "./CampaignTable";

import {
  getCampaigns,
} from "../../services/campaignService";

const CampaignDashboard =
  () => {
    const [
      campaigns,
      setCampaigns,
    ] = useState([]);

    useEffect(() => {
      loadCampaigns();
    }, []);

    const loadCampaigns =
      async () => {
        try {
          const data =
            await getCampaigns();

          setCampaigns(data);
        } catch (error) {
          console.log(error);
        }
      };

    const draftCount =
      campaigns.filter(
        (campaign) =>
          campaign.status ===
          "Draft"
      ).length;

    const scheduledCount =
      campaigns.filter(
        (campaign) =>
          campaign.status ===
          "Scheduled"
      ).length;

    return (
      <>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom:
              "20px",
          }}
        >
          <div className="card">
            <h3>
              Total Campaigns
            </h3>
            <h2>
              {
                campaigns.length
              }
            </h2>
          </div>

          <div className="card">
            <h3>
              Draft Campaigns
            </h3>
            <h2>
              {draftCount}
            </h2>
          </div>

          <div className="card">
            <h3>
              Scheduled
              Campaigns
            </h3>
            <h2>
              {
                scheduledCount
              }
            </h2>
          </div>
        </div>

        <CampaignForm
          setCampaigns={
            setCampaigns
          }
        />

        <CampaignTable
          campaigns={
            campaigns
          }
          setCampaigns={
            setCampaigns
          }
        />
      </>
    );
  };

export default CampaignDashboard;