import {
  deleteTemplate,
} from "../../services/templateService";

const TemplateList = ({
  templates,
  setTemplates,
  setEditingTemplate,
}) => {
  const handleDelete = async (id) => {
    try {
      await deleteTemplate(id);

      setTemplates(
        templates.filter(
          (template) =>
            template._id !== id
        )
      );

      alert("Template Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDuplicate = (
    template
  ) => {
    const duplicatedTemplate = {
      ...template,
      _id: Date.now(),
      template_name:
        template.template_name +
        " Copy",
    };

    setTemplates((prev) => [
      ...prev,
      duplicatedTemplate,
    ]);
  };

  return (
    <div className="card">
      <h2 className="page-title">
        Template List
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {templates.length === 0 ? (
            <tr>
              <td colSpan="4">
                No Templates Found
              </td>
            </tr>
          ) : (
            templates.map(
              (template) => (
                <tr
                  key={template._id}
                >
                  <td>
                    {
                      template.template_name
                    }
                  </td>

                  <td>
                    {template.subject}
                  </td>

                  <td>
                    {
                      template.category
                    }
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        setEditingTemplate(
                          template
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDuplicate(
                          template
                        )
                      }
                    >
                      Duplicate
                    </button>

                    <button
                    className="btn-delete"
                      onClick={() =>
                        handleDelete(
                          template._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateList;