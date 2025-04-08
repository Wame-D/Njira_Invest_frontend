import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  target_role: string;
}

interface NotificationCenterProps {
  target_role: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ target_role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  // Sample notifications
  useEffect(() => {
    const sampleData: Notification[] = [
      {
        id: 1,
        message: "Trade placed successfully!",
        is_read: false,
        created_at: "2025-02-10T12:00:00Z",
        target_role: "admin"
      },
      {
        id: 2,
        message: "System maintenance scheduled.",
        is_read: false,
        created_at: "2025-02-09T15:30:00Z",
        target_role: "admin"
      },
      {
        id: 3,
        message: "Your password was changed successfully.",
        is_read: true,
        created_at: "2025-02-08T10:00:00Z",
        target_role: "admin"
      },
      {
        id: 4,
        message: "Algorithmic trading successfully activated for your account.",
        is_read: false,
        created_at: "2025-02-11T09:00:00Z",
        target_role: "admin"
      },
      {
        id: 5,
        message: "New trading algorithm has been deployed. It's expected to optimize trading strategies and maximize returns.",
        is_read: false,
        created_at: "2025-02-11T09:30:00Z",
        target_role: "admin"
      },
      {
        id: 6,
        message: "Trading bot executed an automatic buy order for asset X. Current value: $1200.",
        is_read: false,
        created_at: "2025-02-10T16:00:00Z",
        target_role: "user"
      },
      {
        id: 7,
        message: "Your algorithmic trading strategy has been updated with new parameters. Review your settings.",
        is_read: false,
        created_at: "2025-02-10T17:15:00Z",
        target_role: "user"
      },
      {
        id: 8,
        message: "Automated trading failed for a certain trade due to market conditions. Please review the trade logs for more details.",
        is_read: false,
        created_at: "2025-02-10T18:00:00Z",
        target_role: "user"
      },
      {
        id: 9,
        message: "Your trading bot encountered a network error while placing an order. Please verify your network connection.",
        is_read: false,
        created_at: "2025-02-09T20:00:00Z",
        target_role: "user"
      },
      {
        id: 10,
        message: "Auto-trading strategy successfully paused. Manual trading will be enabled until you resume automation.",
        is_read: false,
        created_at: "2025-02-08T14:45:00Z",
        target_role: "user"
      },
      {
        id: 11,
        message: "New algorithm parameters detected. Backtesting is recommended before deploying the algorithm to live trading.",
        is_read: false,
        created_at: "2025-02-07T11:00:00Z",
        target_role: "admin"
      },
      {
        id: 12,
        message: "Auto trading bot achieved a new high profit margin for this trading cycle. Keep monitoring the performance.",
        is_read: false,
        created_at: "2025-02-06T10:15:00Z",
        target_role: "user"
      }
    ];

    setNotifications(sampleData.filter((n) => n.target_role === target_role));
  }, [target_role]);

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const clearSelectedNotifications = () => {
    setNotifications((prev) => prev.filter((n) => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((notificationId) => notificationId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative inline-block ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center p-3 text-white rounded-full shadow-md transition-transform transform hover:scale-110 focus:outline-none"
      >
        {notifications.some((n) => !n.is_read) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            {notifications.filter((n) => !n.is_read).length}
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
              {selectedNotifications.length > 0 && (
                <button onClick={clearSelectedNotifications} className="text-red-500 hover:text-red-700">
                  <FaTrash className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-center  ${notification.is_read ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                      }`}
                    onMouseEnter={() => markAsRead(notification.id)}
                  >
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                    />
                    <p className={`flex-grow text-sm ${notification.is_read ? "text-gray-500" : "text-gray-700 font-medium"}`}>
                      {notification.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
              )}
            </div>

            <div className="p-4 bg-gray-100 flex justify-between items-center ">
              <button onClick={markAllAsRead} className="flex items-center text-blue-500 text-sm font-medium hover:underline">
                <FaCheckCircle className="mr-2" />
                Mark all as read
              </button>
              <button onClick={clearAllNotifications} className="text-red-500 text-sm font-medium hover:underline">
                Clear Notifications
              </button>
              <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
