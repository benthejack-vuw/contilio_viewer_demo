import React from 'react';

const icons = {
	ok: '/icons/check.png',
	'out-of-tolerance': '/icons/out_of_tolerance.png',
	missing: '/icons/warning.png',
}

const StatusIndicator = ({ status }) => {
  return (
    <div style={{width: '20px', height: '20px'}}>
			<img src={icons[status]} style={{width: '20px', height: '20px'}} />
    </div>
  );
};

export default StatusIndicator;
