'use client';
import React, { useEffect } from "react";
import { embedDashboard, EmbedDashboardParams } from "@preset-sdk/embedded";
// import './history.css';
import { getCookie } from 'cookies-next';
const userEmail = getCookie('userEmail');

const StrategySymbolDashboard = () => {
  const supersetDomain = "https://superset.xhed.net";
  const embeddedDashboardId = "461fc274-2d7e-4084-ba54-1671d425479b";


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

    const mountPoint = document.getElementById("strategy-symbol-dashboard-container");

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
              hideTitle: true,
              hideChartControls: false,
              filters: {
                visible: false,
                expanded: false,
              },

              urlParams: {
                email: userEmail
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
      <div id="strategy-symbol-dashboard-wrapper">
        <div id="strategy-symbol-dashboard-container" className="w-screen h-screen">
        </div>
      </div>
    </>
  );
};

export default StrategySymbolDashboard;