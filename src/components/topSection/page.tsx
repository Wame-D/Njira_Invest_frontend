"use client";
import "./top.css";
import React, { useState, useEffect } from "react";
import Login from "../login/page";
import anime from "animejs/lib/anime.es.js";
import { getCookie } from "cookies-next";

export default function TopSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const autoLogin = query.get("autoLogin");

    if (autoLogin && !token) {
      setShowLoginModal(true); // Simulates opening the login modal
    } else if (autoLogin && token) {
      window.location.href = "/dashboard"; // Redirect to dashboard if already logged in
    }
  }, []);

  useEffect(() => {
    // Anime.js animations
    anime({
      targets: ".dir-normal",
      translateX: 500,
      opacity: [1, 0.3],
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".dir-reverse",
      translateX: -250,
      opacity: [1, 0.3],
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".dir-alternate",
      translateX: 250,
      opacity: [1, 0.3],
      direction: "alternate",
      easing: "easeInOutSine",
    });
  }, []);

  const token = getCookie("userToken");
  const openLoginModal = () => {
    if (token) {
      window.location.href = "/dashboard";
    } else {
      setShowLoginModal(true);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleDashboardClick = () => {
    if (token) {
      window.location.href = "/dashboard";
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="items-center flex flex-col justify-center w-full topsection">
        <div className="w-full items-center flex flex-col justify-center inner-div">
          <div className="h-fit flex items-center justify-center flex-col text-div">
            <h1 className="text-center dir-normal">
              TRADE FOREX WITH <strong className="automated">AUTOMATED</strong>{" "}
              PRECISION
            </h1>
            <p className="text-m text-white opacity-70 text-center">
              Harness the power of algorithmic trading. Let our system trade for
              you while you watch your portfolio grow, 24/7.
            </p>

            <div className="w-full flex justify-center mt-20 top-links dir-alternate dir-reverse">
              {token ? (
                <a
                  className="links-in-top flex flex-row justify-center items-center inside-utton"
                  onClick={handleDashboardClick}
                >
                  Your dashboard &gt;
                </a>
              ) : (
                <button
                  className="links-in-top flex flex-row justify-center items-center inside-utton"
                  onClick={openLoginModal}
                >
                  Start trading with us &gt;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Conditional rendering for the login modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <button
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                onClick={closeLoginModal}
              >
                &times;
              </button>
              <Login />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
