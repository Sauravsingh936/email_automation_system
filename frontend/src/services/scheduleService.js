import api from "./api";

export const getSchedules =
  async () => {
    const response =
      await api.get(
        "/schedules"
      );

    return response.data;
  };

export const createSchedule =
  async (schedule) => {
    const response =
      await api.post(
        "/schedules",
        schedule
      );

    return response.data;
  };

export const deleteSchedule =
  async (id) => {
    const response =
      await api.delete(
        `/schedules/${id}`
      );

    return response.data;
  };