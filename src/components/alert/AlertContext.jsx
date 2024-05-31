import React, { createContext, useContext, useState } from 'react';
import AlertsComponent from './AlertComponent.jsx';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, text) => {
    setAlerts([...alerts, { type, text, open: true }]);
  };

  const removeAlert = (index) => {
    setAlerts(alerts.map((alert, i) => i === index ? { ...alert, open: false } : alert));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <AlertsComponent alerts={alerts} removeAlert={removeAlert} />
    </AlertContext.Provider>
  );
};
