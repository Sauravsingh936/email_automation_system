import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DashboardLayout = ({ children }) => {
  const { activePage, setActivePage } =
    useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
          }}
        >
          Email Automation
        </h2>

        <button className="nav-btn"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          onClick={() =>
            setActivePage("templates")
          }
        >
          Templates
        </button>

        <button className="nav-btn"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          onClick={() =>
            setActivePage("campaigns")
          }
        >
          Campaigns
        </button>

        <button className="nav-btn"
          style={{
            width: "100%",
          }}
          onClick={() =>
            setActivePage("schedule")
          }
        >
          Schedule Email
        </button>

        <hr
          style={{
            marginTop: "30px",
          }}
        />

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Current Page:
        </p>

        <strong>
          {activePage
            .charAt(0)
            .toUpperCase() +
            activePage.slice(1)}
        </strong>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f7fb",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;