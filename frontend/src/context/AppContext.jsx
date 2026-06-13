import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] =
    useState("templates");

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};