import React from 'react';

function Alert({ showAlert, alertMessage }) {
  if (!showAlert) return null;
  return (
    <div className="custom-alert">
      <div className="alert-content">
        {alertMessage.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default Alert;
