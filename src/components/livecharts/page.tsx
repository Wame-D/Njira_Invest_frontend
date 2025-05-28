"use client";
import { useEffect, useRef, useState } from "react";
import React, { memo } from 'react';

const TradingViewWidget = () => {
    // form data
    const [form, setForm] = useState({
        entry: "",
        stopLoss: "",
        takeProfit: "",
        symbol: "EURUSD",
        tradeType: "BUY",
        email: "",
        token: "",
    });

    const [errors, setErrors] = useState({
        entry: "",
        stopLoss: "",
        takeProfit: "",
    });

    const validateDecimals = (value: string) => {
        return /^\d*\.?\d{0,2}$/.test(value) ? "" : "Only up to two decimal places allowed";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate decimals inline
        if (["entry", "stopLoss", "takeProfit"].includes(name)) {
            const error = validateDecimals(value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation
        const newErrors = {
            entry: validateDecimals(form.entry),
            stopLoss: validateDecimals(form.stopLoss),
            takeProfit: validateDecimals(form.takeProfit),
        };
        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((e) => e !== "");
        if (hasError) return;

        // Log final JSON
        const payload = {
            entry: parseFloat(form.entry),
            stopLoss: parseFloat(form.stopLoss),
            takeProfit: parseFloat(form.takeProfit),
            symbol: form.symbol,
            tradeType: form.tradeType,
            email: form.email,
            token: form.token,
        };

        console.log("JSON payload:", JSON.stringify(payload, null, 2));
    };

    // terminate trade
    const [contractIds, setContractIds] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const idsArray = contractIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        if (idsArray.length === 0) {
            setMessage("Please enter at least one contract ID.");
            return;
        }

        try {
            const response = await fetch("/api/terminate-trade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contractIds: idsArray }),
            });

            if (!response.ok) {
                throw new Error("Failed to terminate trade(s)");
            }

            const result = await response.json();
            setMessage(result.message || "Trades terminated successfully.");
            setContractIds("");
        } catch (error) {
            console.error(error);
            setMessage("An error occurred while terminating trades.");
        }
    }

    //   trading view widget
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
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
    }, []);

    return (
        <div className=" flex flex-row justify-between items-center w-full h-full ">
            {/* trading view widget */}
            <div className="w-[80%] h-full">
                <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
                    <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
                </div>
            </div>

            {/* trading  */}
            <div className="w-[20%] h-full px-4">

                {/* enter trade */}
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto p-4 py-8 bg-white rounded-m shadow space-y-4 border border-gray-200"
                >
                    <h2 className="text-xl font-bold text-center">Trade Setup</h2>

                    {/* Symbol Dropdown */}
                    <div>
                        <label className="block mb-1 font-medium">Symbol</label>
                        <select
                            name="symbol"
                            value={form.symbol}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="EURUSD">EURUSD</option>
                            <option value="GBPUSD">GBPUSD</option>
                            <option value="USDJPY">USDJPY</option>
                            <option value="XAUUSD">XAUUSD</option>
                        </select>
                    </div>

                    {/* Trade Type Dropdown */}
                    <div>
                        <label className="block mb-1 font-medium">Trade Type</label>
                        <select
                            name="tradeType"
                            value={form.tradeType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                        </select>
                    </div>

                    {/* Decimal Inputs */}
                    {["entry", "stopLoss", "takeProfit"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 font-medium capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={form[field as keyof typeof form]}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded-md ${errors[field as keyof typeof errors] ? "border-red-500" : ""
                                    }`}
                                required
                            />
                            {errors[field as keyof typeof errors] && (
                                <p className="text-sm text-red-600">{errors[field as keyof typeof errors]}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-bold py-2 rounded-md hover:bg-blue-700"
                    >
                        Place Trade
                    </button>
                </form>

                {/* terminate trade */}
                <form
                    onSubmit={handleSubmit2}
                    className="max-w-md mx-auto p-4 py-8 bg-white rounded-m shadow space-y-4 mt-8 border border-gray-200"
                >
                    <h2 className="text-xl font-bold text-center">Terminate Trades</h2>

                    <div>
                        <label className="block mb-1 font-medium">Contract ID(s)</label>
                        <input
                            type="text"
                            value={contractIds}
                            onChange={(e) => setContractIds(e.target.value)}
                            placeholder="e.g. 123456, 789012"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 font-bold text-lg rounded-md hover:bg-red-700"
                    >
                        Terminate Trade(s)
                    </button>

                    {message && (
                        <div className="text-center text-sm font-medium text-green-600 mt-2">{message}</div>
                    )}
                </form>
            </div>
        </div>

    );
}

export default memo(TradingViewWidget);
