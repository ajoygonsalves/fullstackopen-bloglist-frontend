import React, { useState, useEffect } from "react";

// Create a component for displaying notifications for 3 seconds

const Notification = ({ message, type }) => {
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
