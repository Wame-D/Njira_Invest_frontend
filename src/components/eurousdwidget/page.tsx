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
      "isTransparent": true  // This removes the background and helps with border removal
    });

    // Find container and append script
    const container = document.querySelector('.tradingview-widget-container__widget');
    if (container) {
      // Clear any existing content
      container.innerHTML = '';
      // Append the new script
      container.appendChild(script);
    }

    // Cleanup
    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container mt-16 w-full max-w-6xl" style={{ border: 'none' }}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        
      </div>
    </div>
  );
};

export default TradingViewWidget;