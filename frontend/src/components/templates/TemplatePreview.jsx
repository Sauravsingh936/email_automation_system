const TemplatePreview = ({
  html,
  title,
  category,
}) => {
  return (
    <div className="card">
      <h2>
        Template Preview
      </h2>

      <hr />

      <p>
        <strong>
          Template:
        </strong>{" "}
        {title || "-"}
      </p>

      <p>
        <strong>
          Category:
        </strong>{" "}
        {category || "-"}
      </p>

      <hr />

      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
};

export default TemplatePreview;