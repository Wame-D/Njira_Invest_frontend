import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DerivAPIBasic from "@deriv/deriv-api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CandlestickChart = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [subscription, setSubscription] = useState(null); // Store the subscription object

  const app_id = 1089; // Replace with your app_id
  const connection = new WebSocket(
    `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
  );
  const api = new DerivAPIBasic({ connection });

  const processTicksToCandles = (ticks) => {
    const timeframe = 60 * 1000; // 1 minute in milliseconds
    const aggregatedData = [];
    const labels = [];

    ticks.reduce((currentCandle, tick) => {
      const tickTime = new Date(tick.epoch * 1000).getTime();

      if (!currentCandle || tickTime >= currentCandle.startTime + timeframe) {
        if (currentCandle) {
          aggregatedData.push(currentCandle);
          labels.push(new Date(currentCandle.startTime).toLocaleTimeString());
        }

        return {
          startTime: tickTime,
          open: tick.quote,
          high: tick.quote,
          low: tick.quote,
          close: tick.quote,
        };
      }

      currentCandle.high = Math.max(currentCandle.high, tick.quote);
      currentCandle.low = Math.min(currentCandle.low, tick.quote);
      currentCandle.close = tick.quote;

      return currentCandle;
    }, null);

    setCandlestickData(aggregatedData);
    setLabels(labels);
  };

  const tickResponse = async (res) => {
    const data = JSON.parse(res.data);

    if (data.error) {
      console.error("Error: ", data.error.message);
      connection.removeEventListener("message", tickResponse, false);
      await api.disconnect();
    }

    if (data.msg_type === "tick") {
      const tick = data.tick;
      processTicksToCandles([tick]);
    }
  };

  const subscribeTicks = async () => {
    const subscriptionObject = await api.subscribeTicks({ ticks: "R_100" }); // Replace subscribe with the correct method
    setSubscription(subscriptionObject);
    connection.addEventListener("message", tickResponse);
  };

  const unsubscribeTicks = async () => {
    if (subscription) {
      await subscription.unsubscribe();
    }
    connection.removeEventListener("message", tickResponse, false);
  };

  useEffect(() => {
    subscribeTicks();

    return () => {
      unsubscribeTicks();
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Open",
        data: candlestickData.map((candle) => candle.open),
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
      {
        label: "High",
        data: candlestickData.map((candle) => candle.high),
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
      {
        label: "Low",
        data: candlestickData.map((candle) => candle.low),
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Close",
        data: candlestickData.map((candle) => candle.close),
        backgroundColor: "rgba(255, 165, 0, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Candlestick Chart</h1>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default CandlestickChart;
