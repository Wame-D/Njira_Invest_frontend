'use client';
import React, { useEffect } from "react";
import { embedDashboard } from "@preset-sdk/embedded";
import './charts.css';

const SupersetDashboard = () => {
  const supersetDomain = "109.74.196.98:8088";
  const embeddedDashboardId = "8102f84b-d555-4dc8-b96b-0d3bc81c9900"

  const fetchGuestToken = async () => {
    try {
      const response = await fetch('https://109.74.196.98/generate-guest-token/'); 

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

    if (mountPoint) { //

      const initializeDashboard = async () => {
        try {
          // Fetch the guest token from the backend
          const guestToken = await fetchGuestToken();

          await embedDashboard({
            id: embeddedDashboardId,
            supersetDomain,
            mountPoint,
            fetchGuestToken: () => {
              console.log("Fetching guest token for embedDashboard");
              console.log("Guest Token:", guestToken);

              return guestToken;
            },
            dashboardUiConfig: {
              hideTitle:true,
              hideChartControls: false,
              filters: {
                expanded: false,
              },
            },
          });

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
        <div id="superset-dashboard-container" className="w-screen h-screen"></div>
      </div>
    </>);

}

export default SupersetDashboard;

