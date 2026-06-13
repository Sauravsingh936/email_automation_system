import { useEffect, useState } from "react";

import {
  createCampaign,
  saveDraft,
} from "../../services/campaignService";

import {
  getTemplates,
} from "../../services/templateService";

import EmailPreview from "./EmailPreview";

const CampaignForm = ({
  setCampaigns,
}) => {
  const [campaign, setCampaign] =
    useState({
      title: "",
      template_id: "",
      subject: "",
      status: "",
    });

  const [templates, setTemplates] =
    useState([]);

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates =
    async () => {
      try {
        const data =
          await getTemplates();

        setTemplates(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setCampaign({
      ...campaign,
      [name]: value,
    });

    if (
      name === "template_id"
    ) {
      const template =
        templates.find(
          (t) =>
            t._id === value
        );

      setSelectedTemplate(
        template
      );
    }
  };

  const handleSaveDraft =
    async () => {
      try {
        const draft =
          await saveDraft({
            ...campaign,
            status: "Draft",
          });

        setCampaigns(
          (prev) => [
            ...prev,
            draft,
          ]
        );

        setCampaign({
          title: "",
          template_id: "",
          subject: "",
          status: "",
        });

        setSelectedTemplate(
          null
        );

        alert(
          "Draft Saved"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleCreateCampaign =
    async () => {
      try {
        const created =
          await createCampaign({
            ...campaign,
            status:
              "Created",
          });

        setCampaigns(
          (prev) => [
            ...prev,
            created,
          ]
        );

        setCampaign({
          title: "",
          template_id: "",
          subject: "",
          status: "",
        });

        setSelectedTemplate(
          null
        );

        alert(
          "Campaign Created"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div className="card">
        <h2 className="page-title">
          Create Campaign
        </h2>

        <label>
          Campaign Name
        </label>

        <input
          type="text"
          name="title"
          value={
            campaign.title
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <label>
          Select Template
        </label>

        <select
          name="template_id"
          value={
            campaign.template_id
          }
          onChange={
            handleChange
          }
        >
          <option value="">
            Select Template
          </option>

          {templates.map(
            (
              template
            ) => (
              <option
                key={
                  template._id
                }
                value={
                  template._id
                }
              >
                {
                  template.template_name
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <label>
          Subject
        </label>

        <input
          type="text"
          name="subject"
          value={
            campaign.subject
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
        className="btn-update"
          onClick={
            handleSaveDraft
          }
        >
          Save Draft
        </button>

        <button
          className="btn-save"
          onClick={
            handleCreateCampaign
          }
        >
          Create Campaign
        </button>
      </div>

      <br />

      {selectedTemplate && (
        <EmailPreview
          title={
            selectedTemplate.template_name
          }
          category={
            selectedTemplate.category
          }
          html={
            selectedTemplate.html_content
          }
        />
      )}
    </>
  );
};

export default CampaignForm;