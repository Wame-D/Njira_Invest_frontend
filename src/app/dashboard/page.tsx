'use client';
import { useEffect, useState } from 'react';
import './dash.css';
import SupersetDashboard from '../charts/page';
import { FaChartPie } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import Link from 'next/link';
import { FaCog } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import SettingsPage from '../settings/page';
import TradingViewWidget from '../livecharts/page';
import LiveTradeChart from '../trade_history/page';
// import TradeDashboard from '../trade_history/page';

import NotificationCenter from '../notification/Notification';

import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

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

const Dashboard = () => {
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
        // secure: window.location.protocol === 'https:',
        maxAge: 60 * 60 * 24 * 7, // 7 days 
        sameSite: 'none',
        domain: 'xhed.net',
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
  };

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

  // variable to keep track  of active link setting default to overveiw
  const [activeLink, setActiveLink] = useState('overview');
  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  // State to control visibility of nav-bar
  const [isNavVisible, setIsNavVisible] = useState(true);
  const toggleNav = () => {
    setIsNavVisible(prevState => !prevState);  // Toggle visibility
  };

  return (
    <div className='dashoard'>
      {/* nav bar */}
      <div id='nav-bar'>
        <button className='toggle-nav-btn mt-4 ml-4' onClick={toggleNav}>
          {isNavVisible ? (
            <TbLayoutSidebarLeftCollapseFilled className='toggle-icon' />
          ) : (
            <TbLayoutSidebarLeftExpandFilled className='toggle-icon' />
          )}
        </button>
        <div className='links-in-nav-bar'>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'overview' ? 'active-link' : ''}`}
            onClick={() => handleClick('overview')}
          >
            <MdDashboard className={`link-icon ${activeLink === 'overview' ? 'active-link' : ''}`} /> <p className='link-text'>Overview</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'charts' ? 'active-link' : ''}`}
            onClick={() => handleClick('charts')}
          >
            <FaChartPie className={`link-icon ${activeLink === 'charts' ? 'active-link' : ''}`} /> <p className='link-text'>Charts</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'trade-history' ? 'active-link' : ''}`}
            onClick={() => handleClick('trade-history')}
          >
            <AiOutlineHistory className={`link-icon ${activeLink === 'trade-history' ? 'active-link' : ''}`} /> <p className='link-text'>Trade History</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'risk-analysis' ? 'active-link' : ''}`}
            onClick={() => handleClick('risk-analysis')}
          >
            <FaExclamationTriangle className={`link-icon ${activeLink === 'risk-analysis' ? 'active-link' : ''}`} /> <p className='link-text'>Risk Analysis</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'settings' ? 'active-link' : ''}`}
            onClick={() => handleClick('settings')}
          >
            <FaCog className={`link-icon ${activeLink === 'settings' ? 'active-link' : ''}`} /> <p className='link-text'>Settings</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-8 ${activeLink === 'profile' ? 'active-link' : ''}`}
            onClick={() => handleClick('profile')}
          >
            <FaUserCircle className={`link-icon ${activeLink === 'profile' ? 'active-link' : ''}`} /> <p className='link-text'>Profile</p>
          </Link>
          <button className='logout-link mt-4' onClick={handleLogout}>
            <FiLogOut className='logout-icon' /> <p className='logout-text'>Logout  </p>
          </button>
        </div>
      </div>

      {/* main dashboard content */}
      <div
        className={`dashboard-content ${isNavVisible ? 'nav-visible' : 'nav-hidden'}`}
      >
        <div className='small-header'>
          <div className='flex flex-row '>
            <button className='toggle-nav-btn ml-8' onClick={toggleNav}>
              {!isNavVisible && (
                <TbLayoutSidebarLeftExpandFilled className='toggle-icon' />
              )}
            </button>

            <Link href="/">
              <h1 className='logo'>FX TRADING</h1>
            </Link>
          </div>
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
          {/* div for personal information */}
          <div className='flex flex-row items-center justify-center gap-8'>
            <NotificationCenter target_role={'admin'} />
            <div className='flex flex-row items-center justify-center'>
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
        </div>
        <div id="over" className={`hidden-content ${activeLink === 'overview' ? 'superset-chatrs-div' : ''}`}>
          <SupersetDashboard />
        </div>

        <div className={`hidden-content ${activeLink === 'settings' ? 'settings-div' : ''}`}>
          <SettingsPage />
        </div>
        {/* trading view charts */}
        <div className={`hidden-content ${activeLink === 'charts' ? 'settings-divv' : ''}`}>
          {/* <StockChart /> */}

          <TradingViewWidget />
        </div>

        {/* trading history */}
        <div className={`hidden-content ${activeLink === 'trade-history' ? 'settings-div' : ''}`}>
          <LiveTradeChart />
        </div>
      </div>
    </div>
  )
};

export default Dashboard;

//           <p className='text-m text-black opacity-70'><strong>Login ID:</strong> {authorizeData.authorize.authorize.loginid}</p>
//           <p className='text-m text-black opacity-70'><strong>Country:</strong> {authorizeData.authorize.authorize.country}</p>
//           <p className='text-m text-black opacity-70'><strong>Local Currencies:</strong> {Object.keys(authorizeData.authorize.authorize.local_currencies).join(', ')}</p>
//           <p className='text-m text-black opacity-70'><strong>User ID:</strong> {authorizeData.authorize.authorize.user_id}</p>
//           <p className='text-m text-red-500 opacity-70'><strong className='text-red-500'>Broker:</strong> {authorizeData.authorize.authorize.landing_company_fullname}</p>
//           <p className='text-m text-black opacity-70'>{authorizeData.authorize.authorize.account_list[0].account_category} account</p>

