'use client';
import React, { useEffect } from "react";
import { embedDashboard, EmbedDashboardParams } from "@preset-sdk/embedded";
import './history.css';
import { getCookie } from 'cookies-next';
// const userEmail = getCookie('userEmail');
const userEmail = "newnew@xhed.com";

const TradeDashboard = () => {
  const supersetDomain = "https://superset.xhed.net";
  const embeddedDashboardId = "fa733f1c-698c-47e8-9eeb-b4ab38f0adcf";
  const userEmail = "newnew@xhed.com";

  const fetchGuestToken = async () => {
    try {
      const response = await fetch('https://api.xhed.net/generate-guest-token/');

      if (!response.ok) {
        throw new Error('Failed to fetch guest token');
      }

      const data = await response.json();
      return data.guest_token;
    } catch (error) {
      console.error('Error fetching guest token:', error);
      throw error;
    }
  };

  useEffect(() => {
    const mountPoint = document.getElementById("trade-dashboard-container");

    if (mountPoint) {
      const initializeDashboard = async () => {
        try {
          // Fetch the guest token from the backend
          const guestToken = await fetchGuestToken();

          console.log("Fetched guest token:", guestToken); // Debug the token
          // Embed the dashboard with the guest token and user email filter
          await embedDashboard({
            id: embeddedDashboardId,
            supersetDomain,
            mountPoint,
            fetchGuestToken: () => {
              console.log("Fetching guest token for embedDashboard");
              console.log("Guest Token:", guestToken); // Log the token for debugging
              return guestToken;
            },
            dashboardUiConfig: {
              // hideFilters: true,
              hideTitle: true,
              hideChartControls: false,
              filters: {
                visible: false,
                expanded: false,
              },

              urlParams: {
                email: userEmail,
              },
            },
            iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox']
          } as unknown as EmbedDashboardParams);
        } catch (error) {
          console.error('Error initializing dashboard:', error);
        }
      };

      initializeDashboard();
    }
  }, [embeddedDashboardId, supersetDomain, userEmail]); // Add userEmail to the dependency array

  return (
    <>
      <div id="trade-dashboard-wrapper">
        <div id="trade-dashboard-container" className="w-screen h-screen">
        </div>
      </div>
    </>
  );
};

export default TradeDashboard;


import { useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, BaselineSeriesPartialOptions, Time, ColorType } from 'lightweight-charts';

// interface TradeData {
//   value: number;
//   time: Time;
// }

interface TradeConfig {
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  entryTime: Time;
}

const LiveTradeChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [tradeConfig, setTradeConfig] = useState<TradeConfig | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const baselineSeriesRef = useRef<ISeriesApi<'Baseline'> | null>(null);

  useEffect(() => {
    const fetchTradeConfig = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/testContract/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail }), // Replace with your userEmail
        });

        const config = await response.json();
        console.log('Trade Config:', config);

        // Use entryTime and currentTime from the backend
        setTradeConfig({
          entryPrice: config.entryPrice,
          stopLoss: config.stopLoss,
          takeProfit: config.takeProfit,
          entryTime: config.entryTime, // Use entryTime from backend
        });

        setCurrentPrice(config.currentPrice); // Set initial price
      } catch (error) {
        console.error('Failed to fetch trade configuration:', error);
      }
    };

    fetchTradeConfig();
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || !tradeConfig) return;

    // Initialize the chart only once
    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          textColor: 'black',
          background: { type: ColorType.Solid, color: 'black' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });
      console.log('Chart created:', chart);
      chartRef.current = chart;

      // Add a baseline series with fill colors
      const baselineSeries = chart.addBaselineSeries({
        baseValue: { type: 'price', price: tradeConfig.entryPrice },
        topLineColor: 'rgba(38, 166, 154, 1)', // Green for TP
        topFillColor1: 'rgba(38, 166, 154, 0.28)', // Light green fill
        topFillColor2: 'rgba(38, 166, 154, 0.05)', // Lighter green fill
        bottomLineColor: 'rgba(239, 83, 80, 1)', // Red for SL
        bottomFillColor1: 'rgba(239, 83, 80, 0.05)', // Light red fill
        bottomFillColor2: 'rgba(239, 83, 80, 0.28)', // Lighter red fill
        lineWidth: 2,
      });
      baselineSeriesRef.current = baselineSeries;

      // Convert entryTime to seconds (if it's in milliseconds)
      const entryTimeInSeconds = Number(tradeConfig.entryTime) / 1000;

      // Initial Data (entryPrice, stopLoss, takeProfit)
      const initialData = [
        { value: tradeConfig.entryPrice, time: entryTimeInSeconds as Time }, // Entry time in seconds
      ];
      baselineSeries.setData(initialData);

      // Fit the content to the chart
      chart.timeScale().fitContent();
    }

    // Fetch new data every 5 seconds
    const interval = setInterval(async () => {
      try {
        const response = await fetch('https://api.xhed.net/testContract/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail }), // Replace with your userEmail
        });

        const data = await response.json();
        console.log('Fetched Current Price:', data.currentPrice);

        setCurrentPrice(data.currentPrice);

        // Ensure time is strictly increasing
        const newTime = data.currentTime;
        console.log('Fetched Current time:', newTime);

        // Convert currentTime to a number (ensure it's in seconds)
        const timeInSeconds = Number(newTime);
        console.log('Converted Time in Seconds:', timeInSeconds);

        if (baselineSeriesRef.current) {
          // Update the current price in real-time
          baselineSeriesRef.current.update({
            value: data.currentPrice,
            time: timeInSeconds as Time,
          });

          // Change colors based on trade direction
          if (data.currentPrice >= tradeConfig.takeProfit) {
            baselineSeriesRef.current.applyOptions({
              topLineColor: 'rgba(0, 255, 0, 1)', // Green for TP
              bottomLineColor: 'rgba(0, 255, 0, 1)',
            } as BaselineSeriesPartialOptions);
          } else if (data.currentPrice <= tradeConfig.stopLoss) {
            baselineSeriesRef.current.applyOptions({
              topLineColor: 'rgba(255, 0, 0, 1)', // Red for SL
              bottomLineColor: 'rgba(255, 0, 0, 1)',
            } as BaselineSeriesPartialOptions);
          }
        }
      } catch (error) {
        console.error('Failed to fetch trade data:', error);
      }
    }, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [tradeConfig]);

  if (!tradeConfig || currentPrice === null) {
    return <div>Loading trade configuration...</div>;
  }

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '700px', border: '1px solid red' }} // Temporary border for debugging
    />
  );
};

// export default LiveTradeChart;
