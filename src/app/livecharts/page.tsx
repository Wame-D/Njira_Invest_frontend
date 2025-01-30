"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import './live.css';
import { FiChevronDown } from "react-icons/fi";
import { CandlestickData, Time } from "lightweight-charts";
const StockChart = () => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<IChartApi | null>(null);
    const candlestickSeries = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const [data, setData] = useState<CandlestickData<Time>[]>([]);
    const domain = "https://api.xhed.net";

    const [tableName, setTableName] = useState("eurousd")
    const [symbol, setSymbol] = useState("EURO/USD")
    const [changed, setChanged] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${domain}/get_candles/?symbol=${tableName}`);
                const jsonData = await response.json();
                const parsedData = JSON.parse(jsonData.data);
                const formattedData: CandlestickData<Time>[] = parsedData.map((item: {
                    time: number;
                    open: number;
                    high: number;
                    low: number;
                    close: number;
                }) => {
                    // Perform calculations outside the returned object
                    const utcTimestamp = item.time * 1000; // Convert to milliseconds
                    const catOffset = 2 * 60 * 60 * 1000; // CAT is UTC+2
                    const catTimestamp = utcTimestamp + catOffset * 2;
                
                    return {
                        time: catTimestamp / 1000, // Convert back to seconds for lightweight-charts
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                    };
                });
                

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchData();
    }, [changed]);

    useEffect(() => {
        if (!chartContainerRef.current || data.length === 0) return;

        const container = chartContainerRef.current;

        //  Ensure existing chart is not disposed before removing
        if (chartInstance.current) {
            try {
                chartInstance.current.remove();
            } catch (error) {
                console.error("Chart instance already disposed:", error);
            }
        }

        //  Create a new chart safely
        chartInstance.current = createChart(container, {
            width: container.clientWidth,
            height: container.clientHeight,
            layout: {
                textColor: "black",
                background: { color: "white" },
            },
            rightPriceScale: {
                visible: true,
                borderColor: "#ccc",
                autoScale: true,
            },
            leftPriceScale: {
                visible: true,
                borderColor: "#ccc",
                autoScale: true,
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                borderColor: "#ccc",
            },
        });

        candlestickSeries.current = chartInstance.current.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
            priceScaleId: "right",
        });

        candlestickSeries.current.setData(data);
        chartInstance.current.timeScale().fitContent();

        //  Ensure chart resizes properly
        const resizeObserver = new ResizeObserver(() => {
            if (container && chartInstance.current) {
                chartInstance.current.applyOptions({
                    width: container.clientWidth,
                    height: container.clientHeight,
                });
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            try {
                chartInstance.current?.remove();
                chartInstance.current = null;
            } catch (error) {
                console.error("Error removing chart:", error);
            }
        };
    }, [changed, data]);  // Keep dependencies minimal

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${domain}/get_candles/?symbol=${tableName}`);
                const jsonData = await response.json();
                const latestCandle = jsonData.data;

                if (latestCandle && candlestickSeries.current) {
                    const utcTimestamp = latestCandle.time * 1000;
                    const catOffset = 2 * 60 * 60 * 1000;
                    const catTimestamp = utcTimestamp + catOffset * 2;

                    // Ensure the series exists before updating
                    if (candlestickSeries.current) {
                        candlestickSeries.current.update({
                            time: (catTimestamp / 1000) as Time,
                            open: latestCandle.open,
                            high: latestCandle.high,
                            low: latestCandle.low,
                            close: latestCandle.close,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching latest candle:", error);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [tableName]);  //Use `tableName`, NOT `changed`

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    // method to update table name
    const handleOptionClick = (tableName: string, symbol: string) => {
        setData([])
        setChanged(!changed)
        setTableName(tableName)
        setSymbol(symbol)

        // You can perform any action with the tableName here
    };
    return (
        <div className="flex flex-col">
            <div className="livechart-heading">
                <div
                    className="dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="dropdownButton flex flex-row items-center justify-center">Instrument <span className="ml-2 down-arrow"><FiChevronDown /></span></button>
                    {isOpen && (
                        <div className="dropdownContent">
                            <div onClick={() => handleOptionClick("us30_candles", "EURUSD")}>US30 <span>EURUSD</span></div>
                            <div onClick={() => handleOptionClick("v75_candles", "V75")}>V75 <span>R_75</span></div>
                            <div onClick={() => handleOptionClick("eurousd", "EURO/USD ")}>EURO/USD <span>EURUSD</span></div>
                            <div onClick={() => handleOptionClick("gold_candles", "GOLD/USD ")}>GOLD/USD <span>XAUUSD</span></div>
                        </div>
                    )}
                </div>
                <h2 className="choosen-symbol">{symbol}</h2>
                {/* timeframe dropdown */}
                <div
                    className="dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="dropdownButton flex flex-row items-center justify-center">Time frame <span className="ml-2 down-arrow"><FiChevronDown /></span></button>
                    {isOpen && (
                        <div className="dropdownContent">
                            {/* <div onClick={() => handleOptionClick("us30_candles")}>1 Minute</div>
                            <div onClick={() => handleOptionClick("nasdaq_candles")}>15 Minutes</div>
                            <div onClick={() => handleOptionClick("sp500_candles")}>30 minutes</div>
                            <div onClick={() => handleOptionClick("sp500_candles")}>1 hour</div>
                            <div onClick={() => handleOptionClick("sp500_candles")}>4 hours</div> */}
                        </div>
                    )}
                </div>
            </div>
            <div id="livechart" ref={chartContainerRef} />
        </div>
    )
};

export default StockChart;