"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import Papa from "papaparse";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

// --- Types ---
type Signal = {
  entry: number;
  stopLoss: number;
  takeProfit: number;
  profitLoss: number;
  time: string;
};

type Row = {
  Date: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
};

// --- Helper: Time Ago ---
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

// --- Strategy Analysis ---
function analyzeStrategy(signals: Signal[]) {
  if (signals.length === 0) {
    return {
      winRate: 0,
      avgPL: 0,
      totalPL: 0,
      recommendations: "Not enough data for analysis.",
      improvements: "Upload more FX data to get recommendations.",
      summary: "No trades analyzed.",
    };
  }
  const wins = signals.filter((s) => s.profitLoss > 0).length;
  const winRate = (wins / signals.length) * 100;
  const totalPL = signals.reduce((acc, s) => acc + s.profitLoss, 0);
  const avgPL = totalPL / signals.length;

  let recommendations = "";
  let improvements = "";
  let summary = "";

  if (winRate > 60 && avgPL > 0) {
    recommendations =
      "Your strategy is performing well. Consider increasing position sizes or automating live trading.";
    improvements =
      "Keep monitoring for drawdowns. Test on more pairs and timeframes for robustness.";
    summary = "Strong performance detected.";
  } else if (winRate > 45 && avgPL > 0) {
    recommendations =
      "The strategy is promising. Refine your entry/exit rules for even better results.";
    improvements =
      "Review losing trades for patterns. Adjust stop loss/take profit for risk/reward tuning.";
    summary = "Moderate success, scope for optimization.";
  } else {
    recommendations =
      "Your strategy currently loses more than it wins. Revisit your rules and risk controls.";
    improvements =
      "Analyze losing trades for common mistakes. Try alternative indicators or filters.";
    summary = "Poor performance, needs review.";
  }

  return {
    winRate: Number(winRate.toFixed(1)),
    avgPL: Number(avgPL.toFixed(2)),
    totalPL: Number(totalPL.toFixed(2)),
    recommendations,
    improvements,
    summary,
  };
}

// --- Main Component ---
export default function Backtest() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<Row[] | null>(null);
  const [backtestStarted, setBacktestStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Carousel
  const [centerIdx, setCenterIdx] = useState(0);
  const signalsContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollInterval, setAutoScrollInterval] =
    useState<NodeJS.Timeout | null>(null);

  // --- Backtest Logic (start/stop) ---
  const runBacktest = () => {
    if (!csvData) return;
    setBacktestStarted(true);
    setSignals([]);
    setCurrentIdx(0);
    setCenterIdx(0);
    let i = 0;
    const interval = setInterval(() => {
      if (!csvData || i >= csvData.length) {
        clearInterval(interval);
        setIntervalId(null);
        setBacktestStarted(false);
        return;
      }
      const row = csvData[i];
      const entry = parseFloat(row.Open);
      const stopLoss = entry - 0.03646;
      const takeProfit = entry + 0.01454;
      const profitLoss =
        Math.random() > 0.5
          ? +(takeProfit - entry).toFixed(5)
          : +(stopLoss - entry).toFixed(5);
      const time = row.Date;
      setSignals((prev) => {
        const next = [
          { entry, stopLoss, takeProfit, profitLoss, time },
          ...prev,
        ];
        setCenterIdx(0); // focus on the most recent
        return next;
      });
      setCurrentIdx(i);
      i++;
    }, 1200);
    setIntervalId(interval);
  };

  const stopBacktest = () => {
    if (intervalId) clearInterval(intervalId);
    setBacktestStarted(false);
    setIntervalId(null);
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  };

  // --- CSV Upload ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setUploadedFile(file);
    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
        setLoading(false);
        setUploadSuccess(true);
        setBacktestStarted(false);
        setSignals([]);
        setCurrentIdx(0);
        setCenterIdx(0);
        if (intervalId) clearInterval(intervalId);
      },
    });
  };

  // --- Cancel Uploaded File ---
  const handleCancelUpload = () => {
    setUploadedFile(null);
    setCsvData(null);
    setUploadSuccess(false);
    setBacktestStarted(false);
    setSignals([]);
    setCurrentIdx(0);
    setCenterIdx(0);
    if (intervalId) clearInterval(intervalId);
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  };

  const currentRow = csvData?.[currentIdx];

  // Memoized stats
  const stats = useMemo(() => analyzeStrategy(signals), [signals]);

  // --- Auto-scroll carousel to center the focused card every 2s ---
  useEffect(() => {
    if (!backtestStarted || signals.length === 0) {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      return;
    }
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    // Scroll every 2 seconds, one by one, always focusing the most recent signal (index 0)
    const interval = setInterval(() => {
      setCenterIdx((idx) => {
        // Go from 0 (most recent) to N (oldest shown), but loop back to 0.
        if (signals.length === 0) return 0;
        return (idx + 1) % Math.min(signals.length, 10);
      });
    }, 2000);
    setAutoScrollInterval(interval);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [backtestStarted, signals.length]);

  // --- Scroll the carousel to center the focused card whenever it changes ---
  useEffect(() => {
    if (!signalsContainerRef.current) return;
    setTimeout(() => {
      const container = signalsContainerRef.current!;
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length === 0) return;
      const centerCard = cards[centerIdx];
      if (!centerCard) return;
      const containerRect = container.getBoundingClientRect();
      const cardRect = centerCard.getBoundingClientRect();
      const offset =
        cardRect.left -
        containerRect.left -
        containerRect.width / 2 +
        cardRect.width / 2;
      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    }, 80);
  }, [signals.length, centerIdx, backtestStarted]);

  // --- Handle swipe/scroll for carousel ---

  // --- Keyboard navigation for accessibility ---

  // Split signals into two rows for a grid
  const rowCount = 2;
  const signalsForRows = useMemo(() => {
    const rows: Signal[][] = Array.from({ length: rowCount }, () => []);
    signals.slice(0, 10).forEach((signal, i) => {
      rows[i % rowCount].push(signal);
    });
    return rows;
  }, [signals]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />
      {/* Decorative/intro header - always keep */}
   <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat mb-8 text-center py-8 md:py-14 px-2 md:px-6 rounded-3xl shadow-lg"
      style={{
        backgroundImage:
          "url('https://pic.rutubelist.ru/video/72/65/726509244160c9cad6c8236c95379019.jpg')",
        minHeight: "190px"
      }}
    >
      {/* Overlay for dimming the background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent" />

      {/* Decorative blurred shapes for accent */}
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-sky-400/30 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute right-8 bottom-4 w-24 h-24 rounded-full bg-sky-300/20 blur-2xl opacity-30 pointer-events-none" />

      {/* Space for navigation bar */}
      <div className="h-12 sm:h-16" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
          <span className="underline decoration-2 decoration-sky-500">Backtest</span>
          <span className="font-light ml-2">FxAuto</span>
          <span className="hidden md:inline">:</span>
          <span className="block md:inline ml-2 font-medium text-sky-100/90">
            Malasan Strategy Backtesting
          </span>
        </h2>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-base sm:text-lg font-medium drop-shadow">
          Build trust in your trading strategy with our modern backtesting tool.
          <br className="hidden sm:block" />
          <span className="text-sky-100/85">
            Upload your historical FX data and see how the Malasan strategy performs in real market conditions.
          </span>
        </p>
      </div></section>
      {/* Main content centered */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {/* Main Title Centered */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Malaysian FX Strategy Backtest
          </h1>
          <div className="flex flex-col items-center justify-center">
            <AnimatePresence initial={false}>
              {/* Upload & Controls - Large when not started */}
              {!backtestStarted && (
                <motion.div
                  key="upload"
                  className="w-full flex flex-col items-center"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    scale: 0.96,
                    opacity: 0,
                    y: 40,
                    pointerEvents: "none",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px] py-12 px-6 w-full max-w-lg mb-8"
                    initial={{ scale: 1.04, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{
                      scale: 0.98,
                      opacity: 0,
                      y: 30,
                      pointerEvents: "none",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    {/* Upload button */}
                    {!uploadedFile && (
                      <>
                        <input
                          ref={fileInput}
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <motion.button
                          onClick={() => fileInput.current?.click()}
                          className="px-8 py-3 rounded-2xl bg-blue-700 text-white font-semibold text-lg hover:bg-blue-800 transition mb-4 shadow-md flex items-center gap-2"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                            />
                          </svg>
                          Upload FX CSV
                        </motion.button>
                        <p className="text-gray-400 text-base mb-2">
                          Upload your historical FX data (CSV)
                        </p>
                        <p className="text-gray-300 text-xs">
                          Max size: 2MB. Format: Date, Open, High, Low, Close
                        </p>
                      </>
                    )}
                    {/* File uploaded display */}
                    {uploadedFile && (
                      <div className="w-full flex flex-col items-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 text-sm font-semibold max-w-[220px] truncate">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                              />
                            </svg>
                            {uploadedFile.name}
                          </span>
                          <button
                            className="ml-1 bg-red-50 text-red-600 border border-red-200 rounded-full p-1 hover:bg-red-100 focus:outline-none transition flex items-center"
                            title="Cancel upload"
                            style={{ fontSize: "0.84rem" }}
                            onClick={handleCancelUpload}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        {uploadSuccess && (
                          <motion.div
                            className="flex items-center gap-2 mb-3"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 18,
                            }}
                          >
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-green-600 font-semibold text-sm">
                              Upload successful
                            </span>
                          </motion.div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={runBacktest}
                          className="px-8 py-3 rounded-2xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition shadow-lg mb-2"
                        >
                          Start Backtest
                        </motion.button>
                        <p className="text-gray-500 mt-2 text-xs">
                          {csvData ? `${csvData.length} rows loaded` : ""}
                        </p>
                      </div>
                    )}
                    {loading && (
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <svg
                          className="animate-spin h-12 w-12 text-blue-600 mb-3"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        <span className="text-blue-600 font-medium">
                          Uploading...
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
              {/* Main Backtest UI appears after starting */}
              {backtestStarted && (
                <motion.div
                  key="main"
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.95, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    y: 40,
                    pointerEvents: "none",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Improved STOP BACKTEST Card */}
                    <motion.div
                      className="flex-1 bg-gradient-to-br from-red-50 via-white to-white rounded-3xl shadow-2xl border border-red-100 flex flex-col items-center justify-between min-h-[170px] px-8 py-6 relative overflow-hidden"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08,
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                      }}
                    >
                      <div className="flex items-center gap-3 w-full justify-center mb-3">
                        <motion.button
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "#dc2626",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={stopBacktest}
                          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold uppercase shadow-lg ring-2 ring-red-300/30 hover:scale-105 transition text-base"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="6"
                              y="6"
                              width="12"
                              height="12"
                              rx="3"
                              fill="#fff3f3"
                              stroke="#dc2626"
                              strokeWidth="2.5"
                            />
                            <rect
                              x="9"
                              y="9"
                              width="6"
                              height="6"
                              rx="1"
                              fill="#dc2626"
                            />
                          </svg>
                          Stop Backtest
                        </motion.button>
                      </div>
                      <div className="flex flex-col items-center w-full gap-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full font-bold">
                            ACTIVE
                          </span>
                          <span className="text-red-500 font-semibold text-xs">
                            Backtesting in progress...
                          </span>
                        </div>
                        {csvData && (
                          <div className="flex items-center gap-2 mt-1">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#f87171"
                                strokeWidth="2"
                                fill="#fee2e2"
                              />
                            </svg>
                            <span className="text-gray-600 text-xs">
                              {csvData.length} rows loaded
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-0 left-0 w-[120px] h-[120px] bg-red-100/40 rounded-full blur-2xl -z-10 -translate-x-1/3 -translate-y-1/3"></div>
                      <div className="absolute bottom-0 right-0 w-[80px] h-[80px] bg-red-200/30 rounded-full blur-2xl -z-10 translate-x-1/4 translate-y-1/4"></div>
                    </motion.div>
                    {/* Improved CURRENT BACKTEST PRICE Card */}
                    <motion.div
                      className="flex-1 bg-gradient-to-br from-sky-50 via-white to-white rounded-3xl shadow-2xl border border-sky-100 flex flex-col justify-between min-h-[170px] px-8 py-6 relative overflow-hidden"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12,
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-sky-400"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="#38bdf8"
                              strokeWidth="2"
                              fill="#e0f2fe"
                            />
                          </svg>
                          <span className="text-sky-600 font-semibold text-base">
                            Current Backtest Price
                          </span>
                        </div>
                        <span className="text-xs text-sky-500 font-bold bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">
                          {currentRow?.Date ? "LIVE" : "IDLE"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center h-full flex-1">
                        {backtestStarted && currentRow ? (
                          <>
                            <motion.div
                              className="text-[2.4rem] font-extrabold text-sky-600 flex items-end"
                              key={currentRow.Close}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1.05, opacity: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                            >
                              {parseFloat(currentRow.Close).toFixed(5)}
                              <span className="text-base font-bold ml-2 text-sky-400">
                                USD
                              </span>
                            </motion.div>
                            <div className="text-gray-400 mt-2 text-xs">
                              Date:{" "}
                              <span className="font-medium">
                                {currentRow.Date}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-400 text-lg flex items-center h-16">
                            No data
                          </div>
                        )}
                      </div>
                      <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-sky-100/40 rounded-full blur-2xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                      <div className="absolute bottom-0 left-0 w-[80px] h-[80px] bg-sky-200/30 rounded-full blur-2xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
                    </motion.div>
                  </div>
                  {/* Signals Card: new design, 2 rows, horizontally scrollable */}
                  <motion.div
                    className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{
                      delay: 0.18,
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                  >
                    <div className="text-xl font-semibold mb-5 text-gray-900 flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        className="text-blue-600"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Latest Backtest Signals
                    </div>
                    <div
                      className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pb-2"
                      tabIndex={0}
                    >
                      <div className="flex flex-col gap-6 min-w-[360px]">
                        {[0, 1].map((rowIdx) => (
                          <div key={rowIdx} className="flex flex-row gap-8">
                            {signalsForRows[rowIdx]?.map((signal, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-gradient-to-br from-white to-sky-50 border border-gray-100 rounded-xl shadow px-3 py-4 flex flex-col justify-between min-h-[146px] min-w-[220px] w-[220px] max-w-[230px] mx-1"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                }}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-gray-900 tracking-tight">
                                      FXPAIR/USD
                                    </span>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                                      SELL
                                    </span>
                                    <span className="ml-1 text-xs text-gray-400">
                                      FX
                                    </span>
                                  </div>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-bold rounded-full">
                                    ACTIVE
                                  </span>
                                </div>
                                <div className="flex flex-row justify-between items-stretch mt-2 mb-1 gap-3">
                                  {/* Left: Entry & Stop Loss */}
                                  <div className="flex flex-col justify-between flex-1 max-w-[80px]">
                                    <div>
                                      <div className="text-xs text-gray-400 mb-0.5">
                                        Entry
                                      </div>
                                      <div className="font-semibold text-gray-900 text-sm">
                                        {signal.entry.toFixed(5)}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-400 mb-0.5">
                                        Stop Loss
                                      </div>
                                      <div className="font-semibold text-red-500 text-sm">
                                        {signal.stopLoss.toFixed(5)}
                                      </div>
                                    </div>
                                  </div>
                                  {/* Right: Take Profit & P/L */}
                                  <div className="flex flex-col justify-between flex-1 items-end max-w-[90px]">
                                    <div>
                                      <div className="text-xs text-gray-400 mb-0.5">
                                        Take Profit
                                      </div>
                                      <div className="font-semibold text-green-600 text-sm">
                                        {signal.takeProfit.toFixed(5)}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-400 mb-0.5">
                                        P/L (pips)
                                      </div>
                                      <div
                                        className={`font-semibold text-sm ${
                                          signal.profitLoss > 0
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                      >
                                        {signal.profitLoss}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-end justify-between mt-1">
                                  <span className="text-xs text-gray-400">
                                    {timeAgo(signal.time)}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ))}
                        {signals.length === 0 && (
                          <motion.div
                            className="text-gray-400 text-center py-8 w-[220px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            No signals generated yet.
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {/* Strategy Stats & Recommendations */}
                    <div className="mt-8 rounded-xl border border-gray-100 p-0 overflow-hidden">
                      <div className="bg-gradient-to-tr from-[#e0f7fa] via-[#fff] to-[#f0fdfb] px-0 py-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-8 px-6 py-6">
                          <div className="flex-1 min-w-[160px]">
                            <div className="flex items-center gap-2 mb-3">
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-sky-400"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="11"
                                  stroke="#06b6d4"
                                  strokeWidth="2"
                                  fill="#e0f2fe"
                                />
                              </svg>
                              <div className="text-xl font-extrabold text-sky-700 tracking-tight">
                                Strategy Analysis Summary
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-2">
                              <div className="bg-white shadow-md px-5 py-3 rounded-xl border border-sky-200 text-center min-w-[92px] flex-1">
                                <div className="text-xs text-sky-700 font-semibold uppercase tracking-wide">
                                  Win Rate
                                </div>
                                <div className="text-2xl font-extrabold text-green-500 mt-1">
                                  {stats.winRate}%
                                </div>
                              </div>
                              <div className="bg-white shadow-md px-5 py-3 rounded-xl border border-sky-200 text-center min-w-[92px] flex-1">
                                <div className="text-xs text-sky-700 font-semibold uppercase tracking-wide">
                                  Avg P/L
                                </div>
                                <div
                                  className={`text-2xl font-extrabold ${
                                    stats.avgPL >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  } mt-1`}
                                >
                                  {stats.avgPL}
                                </div>
                              </div>
                              <div className="bg-white shadow-md px-5 py-3 rounded-xl border border-sky-200 text-center min-w-[92px] flex-1">
                                <div className="text-xs text-sky-700 font-semibold uppercase tracking-wide">
                                  Total P/L
                                </div>
                                <div
                                  className={`text-2xl font-extrabold ${
                                    stats.totalPL >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  } mt-1`}
                                >
                                  {stats.totalPL}
                                </div>
                              </div>
                            </div>
                            <div className="rounded-md bg-sky-50 border border-sky-100 mt-3 px-3 py-2 text-gray-700 text-base font-medium shadow-sm">
                              {stats.summary}
                            </div>
                          </div>
                          <div className="flex-[2] min-w-[220px]">
                            <div className="flex flex-col gap-3">
                              <div>
                                <div className="text-xs text-sky-700 font-semibold uppercase mb-1">
                                  Strategy Recommendations
                                </div>
                                <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-gray-800 shadow-sm">
                                  <strong>Recommendation:</strong>{" "}
                                  {stats.recommendations}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-sky-700 font-semibold uppercase mb-1">
                                  What to Improve
                                </div>
                                <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-gray-800 shadow-sm">
                                  <strong>Improve:</strong> {stats.improvements}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx global>{`
        body {
          background: #f8f9fa;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-200 {
          scrollbar-color: #e5e7eb #f9fafb;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f9fafb;
        }
      `}</style>
    </div>
  );
}
