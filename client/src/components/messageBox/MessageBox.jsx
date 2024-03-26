import React from 'react';
import './MessageBox.css'; // Импортируйте стили

function MessageBox({ message, onClose }) {
  return (
    <>
      <div className="overlay" />
      <div className="message-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </>
  );
}

export default MessageBox;
