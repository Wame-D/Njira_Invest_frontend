"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import closeSideBarIcon from '@/public/images/sidebar/close.png';
import openSideBarIcon from '@/public/images/sidebar/open.png';
import NotificationCenter from '../../Components/Notification';
import { FiLogOut } from 'react-icons/fi';
import SupersetDashboard from '@/app/charts/page';
import SettingsPage from '@/app/settings/page';
import StockChart from '@/app/livecharts/page';
import LiveTradeChart from '@/app/trade_history/page';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaChartPie, FaExclamationTriangle, FaCog } from 'react-icons/fa';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { MdDashboard } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';
import './dash.css';
export interface MenuItemProps {
  text: string;
  id: string;
  icon: React.ReactNode;
  href: string; 
  onClick: () => void; 
  handleClick: (id: string) => void; 
  activeLink: string; 
}

interface MenuItem {
text: string;
  id: string;
  icon: React.ReactNode;
  href: string; 
}

interface UserAccount {
  account: string;
  token: string;
  currency: string;
}

interface AuthorizeResponse {
  authorize: {
    authorize: {
      account_list: {
        account_type: string;
        loginid: string;
        currency: string;
        is_virtual: number;
        trading: Record<string, unknown>;
        account_category: string;
      }[];
      balance: number;
      email: string;
      currency: string;
      fullname: string;
      loginid: string;
      scopes: string[];
      country: string;
      local_currencies: { [key: string]: unknown };
      user_id: number;
      landing_company_fullname: string;
      account_category: string;
    };
  };
}


const MenuItem: React.FC<MenuItemProps> = ({ id, href, icon,  text , handleClick ,  onClick, activeLink}) => (
  <Link  key={id}  href={href} passHref className={`nav-links mt-8 ${activeLink === id ? "active-link" : ""}`}
  onClick={() => handleClick(id)}>
    <motion.div
      className="flex items-center p-4 hover:bg-[#0c263d] rounded-lg cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
    ><span className={`link-icon  ${activeLink === id ? "active-link" : ""}`}>{icon}</span>
   
      <span className="ml-4 text-white link-text  text-lg font-semibold">{text}</span>
    </motion.div>
  </Link>

);

interface MainSidebarProps {
  children: React.ReactNode;
  menuItems: MenuItemProps[];
  headerTitle: string;
  target_role: string;
  error?: string;
  authorizeData?:any;
  isTrading: boolean;
  currentTime: number;
  startTime: number;
  formatDuration: (time: number) => string;
  handleLogout?: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
        console.log('Sidebar closed due to scroll');
      }
    };

    const mainContent = document.querySelector('main');
    mainContent?.addEventListener('scroll', handleScroll);

    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, [isSidebarOpen]);

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const domain = "https://api.xhed.net";

  // Initialize the search parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  // Get the query parameters after the searchParams state is set
  const acct1 = searchParams?.get('acct1');
  const token1 = searchParams?.get('token1');
  const cur1 = searchParams?.get('cur1');
  const cookietoken = getCookie('userToken');

  useEffect(() => {
    if (acct1 && token1 && cur1) {
      const accounts: UserAccount[] = [
        { account: acct1, token: token1, currency: cur1 },
      ];
      setCookie('userToken', accounts[0].token, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days 
        sameSite: 'none',
      });
      authorizeUser(accounts[0].token);
    } else if (cookietoken) {
      if (typeof cookietoken === 'string') {
        console.log(cookietoken)
        authorizeUser(cookietoken);
      }
    }
  }, [acct1, token1, cur1]);

  const authorizeUser = async (token: string) => {
    console.log("Sending token:", token);

    try {
      const response = await fetch(`${domain}/authorize/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Authorization failed:', errorData);
        throw new Error(`Authorization failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Authorization successful:', data);

      setAuthorizeData(data);
    } catch (error) {
      setError('Error during authorization');
      console.error('Authorization error:', error);
      // alert(error);
    }
  };

  if (authorizeData) {
    setCookie('userEmail', authorizeData.authorize.authorize.email);
  }

  const handleLogout = () => {
    deleteCookie('userToken');
    deleteCookie('userEmail');
    router.replace('/');
    console.log("User token  and email cleared from this pc.");
  }
  const [isTrading, setIsTrading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const token = getCookie('userToken');
  const email = getCookie('userEmail');
  // Fetch the start_time when the page loads
  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await fetch(`${domain}/Get-start-time/?email=${email}`)

        const data = await response.json();

        if (response.ok) {
          const startTime = new Date(data.start_time).getTime();
          const trading = data.trading;
          // const targetDate = new Date('2025-01-06T10:00:00').getTime();

          if (trading == 1) {
            setIsTrading(true);
            setStartTime(startTime);
          }

        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchStartTime();
  }, [token]);
  // Update the current time every second when trading is active
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isTrading && startTime) {
      interval = setInterval(() => {
        // Calculate elapsed time
        setCurrentTime(Date.now() - startTime);
        // Update every second
      }, 1000);
    } else if (!isTrading) {
      clearInterval(interval);
    }
    // Cleanup the interval on component unmount or state change
    return () => clearInterval(interval);
  }, [isTrading, startTime]);

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return days > 0
      ? `${days} D + ${hours % 24} : ${minutes % 60} : ${seconds % 60}`
      : `${hours} : ${minutes % 60} : ${seconds % 60}`;
  };

const [activeLink, setActiveLink] = useState('overview');
  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  const menuItems = useMemo(
    () => [
      { text:'Overview', icon: <MdDashboard />, href: "/dashboard",id: "overview", },

      { id: "charts", href: "/dashboard", icon: <FaChartPie />, text: "Charts" ,
       
      },
      {
        id: "trade-history", href: "/dashboard", icon: <AiOutlineHistory />, text: "Trade History" ,
    
      },

      {
       id: "risk-analysis", href: "/dashboard", icon: <FaExclamationTriangle />, text: "Risk Analysis",

      },
      {
        id: "settings", href: "/dashboard", icon: <FaCog />, text: "Settings" ,

      },{
        id: "profile", href: "/dashboard", icon: <FaUserCircle />, text: "Profile" ,

      },
    ],
    [],
  );


  return (
    <div className="flex h-screen bg-gray-100">
      <motion.div
      className={`fixed top-16 left-0 h-full bg-[#0c263d] text-white shadow-2xl transition-transform duration-300 backdrop-blur-lg ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '16rem', zIndex: 9999 } as React.CSSProperties} 
    >
        <div className="flex flex-col items-center p-4">
          <div className="w-full space-y-2">

            {menuItems.map((item, index) => (
              <MenuItem activeLink={activeLink} handleClick={handleClick} key={index} {...item} onClick={() => setIsSidebarOpen(false)} />
            ))}
          </div>
          {/* Footer Links */}
          <div className="mt-auto pt-6 pb-4 w-full text-center text-xs font-light border-t border-white">
            {['About Us', 'Contact Us', 'Privacy Policy', 'Terms of Use'].map((text, index) => (
              <Link key={index} href={`/home/pages/${text.toLowerCase().replace(/ /g, '-')}`} passHref>
                <div className="hover:bg-[#0c263d] p-2 rounded cursor-pointer">{text}</div>
              </Link>
            ))}
            <button className="logout-link mt-4" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <p className="logout-text">Logout</p>
            </button>
          </div>
        </div>
      </motion.div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="fixed top-0 left-0 right-0 bg-[#0c263d] text-white z-20 flex items-center justify-between p-4 shadow-lg">
          {/* Sidebar Toggle */}
          <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="bg-white p-2 rounded-full shadow-md">
            <Image src={isSidebarOpen ? closeSideBarIcon : openSideBarIcon} alt="Toggle Sidebar" width={24} height={24} />
          </button>

          {/* Header Title */}
          {/* Balance & Trading Info */}
          {/* <h1 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">{headerTitle}</h1> */}
          <h3>Main Dashboard</h3>
          {/* account balance div */}
          <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {(
              // If authorization data is present, display dashboard
              authorizeData ? (
                <div>
                  <h1 className='fulname '>{authorizeData.authorize.authorize.balance} {authorizeData.authorize.authorize.currency}</h1>
                  <p className='text-sm emailinheader2 opacity-80'>Balance</p>
                </div>
              ) : (
                <p className='text-center'>Getting Balances...</p>
              )
            )}
          </div>
          {/* div for execution time */}
          <div className='flex flex-row'>
            {!isTrading && currentTime == 0 && (
              <div>
                <h2>Bot execution time: </h2>
                <h1>0.0.0</h1>
              </div>
            )}

            {isTrading && (
              <div className='w-full'>
                <h1 id='runing-time'><span className='opacity-80'>Bot is running for: </span> {formatDuration(currentTime)}</h1>
                <p className='text-sm emailinheader2 opacity-80'>Started at: {new Date(startTime).toLocaleString()}</p>
              </div>
            )}

            {!isTrading && currentTime > 0 && (
              <div>
                <h1 id='runing-time'>Stopped after: </h1>
                <p className='text-sm emailinheader2 opacity-80'>{formatDuration(currentTime)}</p>
              </div>
            )}
          </div>

          {/* Notifications & User Info */}
          <div className="flex items-center gap-4">
            <NotificationCenter target_role={'admin'} />
            {/* <FaUserCircle className="text-white text-2xl" /> */} <div className='flex flex-row items-center justify-center'>
            <div>
              <FaUserCircle className='face-icon' />
            </div>
            <div className='flex flex-col mr-8 '>
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {(
                // If authorization data is present, display dashboard
                authorizeData ? (
                  <div>
                    <h1 className='fulname '>{authorizeData.authorize.authorize.fullname}</h1>
                    <p className='text-sm emailinheader2 opacity-90 m-0 p-0'>{authorizeData.authorize.authorize.email}</p>

                  </div>
                ) : (
                  <p className='text-center'>Loading authorization...</p>
                )
              )}
            </div>
          </div>
          </div>
        </header>

        <main className="p-5 mt-16 w-full bg-white rounded-lg shadow-md overflow-y-auto"> <div className='dashoard'>
      <div className='dashboard-conntent'>
        <div id="over" className={`hidden-content ${activeLink === 'overview' ? 'superset-chatrs-div' : ''}`}>
          <SupersetDashboard />
        </div>

        <div className={`hidden-content ${activeLink === 'settings' ? 'settings-div' : ''}`}>
          <SettingsPage />
        </div>
        {/* trading view charts */}
        <div className={`hidden-content ${activeLink === 'charts' ? 'settings-div' : ''}`}>
          <StockChart />
        </div>
        {/* trading history */}
        <div className={`hidden-content ${activeLink === 'trade-history' ? 'settings-div' : ''}`}>
          <LiveTradeChart/>
        </div>
      </div>

    </div></main>
      </div>
    </div>
  );
};

export default MainSidebar;
