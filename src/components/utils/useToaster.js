import React, { useState, useEffect } from 'react';

const Toast = ({ message, type }) => {
  // Set background color based on type
  let bgColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  // Set text color based on type
  const textColor = type === 'warning' ? 'text-black' : 'text-white';

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-md shadow-lg ${bgColor} ${textColor} opacity-100 transition-opacity duration-300`}
    >
      {message}
    </div>
  );
};

const useToaster = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timerId;
    if (toast) {
      timerId = setTimeout(() => {
        setToast(null);
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [toast]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  return { showToast, ToastComponent: toast && <Toast {...toast} /> };
};

export default useToaster;
