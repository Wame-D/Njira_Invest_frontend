import React, { useEffect } from 'react';

const TickerTapeWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
        { "description": "GOLD", "proName": "NCDEX:GOLD" },
        { "description": "US30", "proName": "CAPITALCOM:US30" },
        { "description": "V75", "proName": "CAPITALCOM:VIX" }
      ],
      "showSymbolLogo": true,
      "isTransparent": true,
      "displayMode": "adaptive",
      "colorTheme": "light",
      "locale": "en"
    });

    const container = document.querySelector('.tradingview-widget-container__widget');
    if (container) container.appendChild(script);

    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ width: '100%', height: '46px' }}>
      <div className="tradingview-widget-container__widget" style={{ width: '100%', height: '100%' }}></div>
      <div className="tradingview-widget-copyright">
        
      </div>
    </div>
  );
};

export default TickerTapeWidget;