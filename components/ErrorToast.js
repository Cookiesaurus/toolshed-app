'use client';
import React from "react";
import { useState } from "react";
const ErrorToast = ({ message, duration = 10000 }) => {
    const [visible, setVisible] = useState(true);
  
    // Hide the toast after the specified duration
    setTimeout(() => {
      setVisible(false);
    }, duration);
  
    return visible ? (
      <div className="toast" role="alert">
        <div className="toast-error">{message}</div>
      </div>
    ) : null;
  };
  
  export default ErrorToast;