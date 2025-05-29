"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

interface Notification {
  subject: string;
  message: string;
  timestamp: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const email = "mkalidozo3@gmail.com";

  const BACKEND_URL = "http://localhost:8000";

  const fetchNotifications = async () => {
    try {
      if (!email) return;

      const res = await fetch(`${BACKEND_URL}/notifications/fetch/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const deleteNotifications = async () => {
    try {
      if (!email) return;

      await fetch(`${BACKEND_URL}/notifications/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setNotifications([]);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    if (email) {
      fetchNotifications();
    }
  }, [email]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center p-3 text-white rounded-full shadow-md transition-transform transform hover:scale-110"
      >
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            {notifications.length}
          </span>
        )}
        <IoNotifications className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-10 right-0 mt-2 w-96 bg-white shadow-lg rounded-lg"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-700">Notifications</h3>
              <button
                onClick={deleteNotifications}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="p-4 bg-white hover:bg-gray-50">
                    <p className="font-semibold text-gray-700">
                      {notification.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No new notifications
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-100 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
