import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import {
  saveTemplate,
  updateTemplate,
} from "../../services/templateService";

const TemplateForm = ({
  onPreview,
  setPreviewData,
  templates,
  setTemplates,
  editingTemplate,
  setEditingTemplate,
}) => {
  const [template, setTemplate] = useState({
    template_name: "",
    subject: "",
    html_content: "",
    category: "Marketing",
  });

  useEffect(() => {
    if (editingTemplate) {
      setTemplate(editingTemplate);
    }
  }, [editingTemplate]);

  const handleChange = (e) => {
    setTemplate({
      ...template,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      !template.template_name ||
      !template.subject ||
      !template.html_content
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingTemplate) {
        const updatedTemplate =
          await updateTemplate(
            editingTemplate._id,
            template
          );

        setTemplates(
          templates.map((item) =>
            item._id === editingTemplate._id
              ? updatedTemplate
              : item
          )
        );

        alert(
          "Template Updated Successfully"
        );
      } else {
        const savedTemplate =
          await saveTemplate(template);

        setTemplates([
          ...templates,
          savedTemplate,
        ]);

        alert(
          "Template Saved To Database"
        );
      }

      setTemplate({
        template_name: "",
        subject: "",
        html_content: "",
        category: "Marketing",
      });

      setEditingTemplate(null);
    } catch (error) {
      console.error(error);

      alert(
        "Failed To Save Template"
      );
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">
        {editingTemplate
          ? "Edit Template"
          : "Create Template"}
      </h2>

      <label>Template Name</label>

      <input
        type="text"
        name="template_name"
        value={template.template_name}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Email Subject</label>

      <input
        type="text"
        name="subject"
        value={template.subject}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Category</label>

      <select
        name="category"
        value={template.category}
        onChange={handleChange}
      >
        <option value="Marketing">
          Marketing
        </option>

        <option value="Newsletter">
          Newsletter
        </option>

        <option value="Promotion">
          Promotion
        </option>

        <option value="Transactional">
          Transactional
        </option>
      </select>

      <br />
      <br />

      <label>HTML Content</label>

      <RichTextEditor
  content={
    template.html_content
  }
  onChange={(value) =>
    setTemplate({
      ...template,
      html_content: value,
    })
  }
/>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
  className={
    editingTemplate
      ? "btn-update"
      : "btn-save"
  }
  onClick={handleSave}
>
          {editingTemplate
            ? "Update Template"
            : "Save Template"}
        </button>

        <button
        className="btn-preview"
  onClick={() => {
    onPreview(
      template.html_content
    );

    setPreviewData({
      title:
        template.template_name,
      category:
        template.category,
    });
  }}
>
  Preview
</button>
      </div>
    </div>
  );
};

export default TemplateForm;