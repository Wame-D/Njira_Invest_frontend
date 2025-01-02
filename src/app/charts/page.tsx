'use client';
import React, { useEffect } from "react";
import { embedDashboard } from "@preset-sdk/embedded";
import './charts.css';

const SupersetDashboard = () => {
  const supersetDomain = "https://970dc793.us2a.app.preset.io";
  const embeddedDashboardId = "afe0ee9c-4bda-4694-8877-eca384df8ffb"

  const fetchGuestToken = async () => {
    try {
      const response = await fetch('https://forex1-ul7ikrzn.b4a.run/generate-guest-token/'); 

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

