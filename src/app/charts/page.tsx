'use client';
import React, { useEffect } from "react";
import { embedDashboard, EmbedDashboardParams } from "@preset-sdk/embedded";
import './charts.css';

const SupersetDashboard = () => {
  const supersetDomain = "https://superset.xhed.net";
  const embeddedDashboardId = "e6eba5a8-905a-49ec-8bc9-e3d3c4dfc7db";

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
    const mountPoint = document.getElementById("superset-dashboard-container");

    if (mountPoint) { 
      const initializeDashboard = async () => {
        try {
          // Fetch the guest token from the backend
          const guestToken = await fetchGuestToken();
          
          console.log("Fetched guest token:", guestToken); // Debug the token

          // Embed the dashboard with the guest token
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
              hideTitle:true,
              hideChartControls: false,
              filters: {
                expanded: true,
              },
            },
            iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox']
          } as unknown as EmbedDashboardParams);
        } catch (error) {
          console.error('Error initializing dashboard:', error);
        }
      };

      initializeDashboard();
    };
  }, [embeddedDashboardId, supersetDomain]);

  return (
    <>
      <div id="dashboard-wrapper">
        <div id="superset-dashboard-container" className="w-screen h-screen">
        </div>
      </div>
    </>
  );
};

export default SupersetDashboard;
