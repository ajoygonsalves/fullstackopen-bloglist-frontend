import React, { createContext, useReducer, useContext } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { message: action.payload.message, type: action.payload.type };
    case "HIDE_NOTIFICATION":
      return { message: "", type: "" };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: "",
    type: "",
  });

  const showNotification = (message, type = "info") => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: { message, type } });

    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={notification.message} type={notification.type} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
