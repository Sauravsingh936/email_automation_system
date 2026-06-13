import { useEffect, useState } from "react";

import {
  getSchedules,
  createSchedule,
  deleteSchedule,
} from "../../services/scheduleService";

const ScheduleCampaign = () => {
  const [schedule, setSchedule] = useState({
    campaignName: "",
    date: "",
    time: "",
    timezone: "Asia/Kolkata",
  });

  const [scheduledEmails, setScheduledEmails] =
    useState([]);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const data =
        await getSchedules();

      setScheduledEmails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value,
    });
  };

  const handleSchedule =
    async () => {
      try {
        if (
          !schedule.campaignName ||
          !schedule.date ||
          !schedule.time
        ) {
          alert(
            "Please fill all fields"
          );
          return;
        }

        const savedSchedule =
          await createSchedule(
            schedule
          );

        setScheduledEmails([
          ...scheduledEmails,
          savedSchedule,
        ]);

        setSchedule({
          campaignName: "",
          date: "",
          time: "",
          timezone:
            "Asia/Kolkata",
        });

        alert(
          "Email Scheduled Successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Schedule Email"
        );
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteSchedule(id);

        setScheduledEmails(
          scheduledEmails.filter(
            (item) =>
              item._id !== id
          )
        );

        alert(
          "Schedule Deleted Successfully"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div className="card">
        <h2 className="page-title">
          Schedule Email
        </h2>

        <input
          type="text"
          name="campaignName"
          placeholder="Campaign Name"
          value={
            schedule.campaignName
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="date"
          name="date"
          value={schedule.date}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          type="time"
          name="time"
          value={schedule.time}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <select
          name="timezone"
          value={
            schedule.timezone
          }
          onChange={
            handleChange
          }
        >
          <option value="Asia/Kolkata">
            Asia/Kolkata
          </option>

          <option value="UTC">
            UTC
          </option>

          <option value="America/New_York">
            America/New_York
          </option>
        </select>

        <br />
        <br />

        <button
         className="btn-schedule"
          onClick={
            handleSchedule
          }
        >
          Schedule Email
        </button>
      </div>

      <div className="card">
        <h2 className="page-title">
          Scheduled Emails
        </h2>

        {scheduledEmails.length ===
        0 ? (
          <p>
            No Scheduled Emails
            Found
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Date</th>
                <th>Time</th>
                <th>Timezone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {scheduledEmails.map(
                (email) => (
                  <tr
                    key={
                      email._id
                    }
                  >
                    <td>
                      {
                        email.campaignName
                      }
                    </td>

                    <td>
                      {
                        email.date
                      }
                    </td>

                    <td>
                      {
                        email.time
                      }
                    </td>

                    <td>
                      {
                        email.timezone
                      }
                    </td>

                    <td>
                      <button
                      className="btn-delete"
                        onClick={() =>
                          handleDelete(
                            email._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ScheduleCampaign;