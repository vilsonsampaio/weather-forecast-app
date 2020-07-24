import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [city, setCity] = useState(() => {
    const cityLocalStorage = window.localStorage.getItem("city");

    return cityLocalStorage ? cityLocalStorage : "";
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ city, setCity, data, setData, loading, setLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
