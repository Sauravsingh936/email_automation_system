import { useContext } from "react";

import DashboardLayout from "./layouts/DashboardLayout";

import TemplateBuilder from "./components/templates/TemplateBuilder";

import CampaignDashboard from "./components/campaigns/CampaignDashboard";

import ScheduleCampaign from "./components/campaigns/ScheduleCampaign";

import { AppContext } from "./context/AppContext";

function App() {
  const { activePage } =
    useContext(AppContext);

  return (
    <DashboardLayout>
      {activePage ===
        "templates" && (
        <TemplateBuilder />
      )}

      {activePage ===
        "campaigns" && (
        <CampaignDashboard />
      )}

      {activePage ===
        "schedule" && (
        <ScheduleCampaign />
      )}
    </DashboardLayout>
  );
}

export default App;