const EmailPreview = ({
  html,
  title,
  category,
}) => {
  return (
    <div className="card">
      <h2>
        Email Preview
      </h2>

      {title && (
        <h3>
          {title}
        </h3>
      )}

      {category && (
        <p>
          <strong>
            Category:
          </strong>{" "}
          {category}
        </p>
      )}

      <hr />

      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
};

export default EmailPreview;
