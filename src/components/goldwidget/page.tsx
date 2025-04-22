import React, { useEffect } from 'react';

const GoldWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "NCDEX:GOLD",
      "width": "100%",
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": true
    });

    // Append script to widget container
    const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (widgetContainer && script.parentNode === widgetContainer) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default GoldWidget;