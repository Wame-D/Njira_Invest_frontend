"use client";
import { useEffect, useRef } from "react";
import React, { memo } from 'react';
// Define the prop types for Scroller
interface ScrollerProps {
    isScrolled: boolean;
}
const TradingViewWidget: React.FC<ScrollerProps> = ({ isScrolled }) => {
    
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isScrolled) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;

            // Fixing the JSON structure: wrap the object in a string
            script.innerHTML = `
            {
                "autosize": true,
                "symbol": "EIGHTCAP:XAUUSD",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "withdateranges": true,
                "range": "ALL",
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "details": true,
                "hotlist": true,
                "calendar": true,
                "support_host": "https://www.tradingview.com"
            }
        `;

            // Append the script to the container
            if (container.current) {
                container.current.appendChild(script);
            }
        }
    }, [isScrolled]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
            {/* <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div> */}
        </div>
    );
}

export default memo(TradingViewWidget);
