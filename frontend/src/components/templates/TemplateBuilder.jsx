import { useEffect, useState } from "react";

import TemplateForm from "./TemplateForm";
import TemplatePreview from "./TemplatePreview";
import TemplateList from "./TemplateList";

import {
  getTemplates,
} from "../../services/templateService";

const TemplateBuilder = () => {
  const [html, setHtml] = useState("");

  const [previewData, setPreviewData] =
    useState({
      title: "",
      category: "",
    });

  const [templates, setTemplates] =
    useState([]);

  const [editingTemplate, setEditingTemplate] =
    useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data =
        await getTemplates();

      setTemplates(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TemplateForm
        onPreview={setHtml}
        setPreviewData={
          setPreviewData
        }
        templates={templates}
        setTemplates={setTemplates}
        editingTemplate={
          editingTemplate
        }
        setEditingTemplate={
          setEditingTemplate
        }
      />

      <br />

      <TemplatePreview
        html={html}
        title={
          previewData.title
        }
        category={
          previewData.category
        }
      />

      <br />

      <TemplateList
        templates={templates}
        setTemplates={
          setTemplates
        }
        setEditingTemplate={
          setEditingTemplate
        }
      />
    </>
  );
};

export default TemplateBuilder;