'use client';
import React, { useEffect } from "react";
import { embedDashboard } from "@preset-sdk/embedded";
import './charts.css';

const SupersetDashboard = () => {
  const supersetDomain = "http://109.74.196.98:8088";
  const embeddedDashboardId = "707fbb66-9a39-4919-a772-473406b806b1"

  const fetchGuestToken = async () => {
    try {
      const response = await fetch('http://109.74.196.98:9090/generate-guest-token/'); 

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

