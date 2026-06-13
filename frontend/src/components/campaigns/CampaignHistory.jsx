const CampaignHistory = ({
  history,
}) => {
  if (
    !history ||
    history.length === 0
  ) {
    return (
      <p>
        No History Available
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      <h4>
        Campaign History
      </h4>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map(
            (
              item,
              index
            ) => (
              <tr key={index}>
                <td>
                  {item.action}
                </td>

                <td>
                  {new Date(
                    item.date
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignHistory;