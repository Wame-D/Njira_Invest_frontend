import { useEffect } from 'react';

// Declare TradingView types with proper constructor signature
declare global {
  interface Window {
    TradingView: {
      widget: new (options: TradingViewWidgetOptions) => ITradingViewWidget;
    };
  }
}

interface ITradingViewWidget {
  // Add methods if you need to call any on the widget instance
}

interface TradingViewWidgetOptions {
  autosize?: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_side_toolbar?: boolean;
  container_id?: string;
  studies?: string[];
  overrides?: {
    [key: string]: any;
  };
}

const TradingViewWidget = () => {
  useEffect(() => {
    const createWidget = () => {
      // Now properly typed with the new operator
      const widget = new window.TradingView.widget({
        autosize: true,
        symbol: 'OANDA:EURUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_top_toolbar: true,
        hide_side_toolbar: true,
        container_id: 'tradingview-widget-container',
        studies: [],
        overrides: {
          "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
          "paneProperties.background": "#ffffff",
          "paneProperties.vertGridProperties.color": "#f0f0f0",
          "paneProperties.horzGridProperties.color": "#f0f0f0",
          "mainSeriesProperties.style": 0,
          "symbolNameProperties.fontSize": 10,
          "symbolNameProperties.color": "#333333",
          "paneProperties.legendProperties.showLegend": true,
          "paneProperties.legendProperties.showStudyArguments": false,
          "paneProperties.legendProperties.showStudyTitles": false,
          "paneProperties.legendProperties.showStudyValues": true,
          "scalesProperties.fontSize": 10,
        },
      });

      return widget;
    };

    if (window.TradingView) {
      createWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.id = 'tradingview-widget-script';

    script.onload = () => {
      createWidget();
    };

    document.body.appendChild(script);

    return () => {
      const scriptElement = document.getElementById('tradingview-widget-script');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      const widgetContainer = document.getElementById('tradingview-widget-container');
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '400px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        transform: 'scale(0.9)',
        transformOrigin: 'top left',
        width: '111.11%',
        height: '111.11%'
      }}>
        <div 
          id="tradingview-widget-container"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default TradingViewWidget;