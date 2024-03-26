import React, { useState, useEffect } from 'react';

const Toast = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return visible ? (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-white rounded-md">
      <p>{message}</p>
    </div>
  ) : null;
};

export default Toast;