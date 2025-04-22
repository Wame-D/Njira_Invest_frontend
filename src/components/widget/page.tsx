// components/TradingViewWidget.js
import { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": "OANDA:EURUSD",
      "width": "100%",
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": false
    });

    // Append script to container
    const container = document.querySelector('.tradingview-widget-container__widget');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container mt-16 w-full max-w-6xl">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        
      </div>
    </div>
  );
};

export default TradingViewWidget;