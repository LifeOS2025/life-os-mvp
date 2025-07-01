import React from 'react';

const buttonStyle = {
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Button = ({ onClick, children }) => {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
