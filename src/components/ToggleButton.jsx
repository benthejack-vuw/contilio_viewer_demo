import React from 'react';

const ToggleButton = ({ status, callback }) => {
  return (
    <div style={{width: '20px', height: '20px'}} onClick={callback}>
      <img src={status ? '/icons/visible.png' : '/icons/not_visible.png'} style={{width: '100%', height: '100%', cursor: 'pointer'}} />
    </div>
  );
};

export default ToggleButton;
