// components/EmbeddedDashboard.js

import React from 'react';

const EmbeddedDashboard = () => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <iframe
        src="https://970dc793.us2a.app.preset.io/superset/dashboard/d3ca855a-799b-4db7-84ae-394a88d2f920/"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Embedded Dashboard"
      />
    </div>
  );
};

export default EmbeddedDashboard;
