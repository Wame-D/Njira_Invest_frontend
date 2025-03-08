'use client';
import { useEffect, useState } from 'react';
import './dash.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import dynamic from 'next/dynamic';

import NotificationCenter from '../notification/Notification';

// Lazy load components
const SupersetDashboard = dynamic(() => import('../charts/page'), { ssr: false });
const SignalsDashboard = dynamic(() => import('../signals/signal'), { ssr: false });
const SettingsPage = dynamic(() => import('../settings/page'), { ssr: false });
const TradingViewWidget = dynamic(() => import('../livecharts/page'), { ssr: false });
const TradeDashboard = dynamic(() => import('../trade_history/page'), { ssr: false });
const AccountDashboard = dynamic(() => import('../account_overview/page'), { ssr: false });
const StrategyDashboard = dynamic(() => import('../strategy_comparizon/page'), { ssr: false });
const StrategySymbolDashboard = dynamic(() => import('../strategy_vs_symbol/page'), { ssr: false });


// importing react icons
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { MdSettingsApplications } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { TfiMenu } from "react-icons/tfi";
import { FaRegWindowClose } from "react-icons/fa";

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
  const email = getCookie('userEmail');
  const userName = getCookie('userName');
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (acct1 && token1 && cur1) {
      const accounts: UserAccount[] = [
        { account: acct1, token: token1, currency: cur1 },
      ];
      setCookie('userToken', accounts[0].token, {
        // secure: true,
        secure: window.location.protocol === 'https:',
        maxAge: 60 * 60 * 24 * 7, // 7 days 
        sameSite: 'none',
        domain: 'xhed.net',
      });
      authorizeUser(accounts[0].token);
    } else if (cookietoken) {
      if (typeof cookietoken === 'string') {
        if (showBalance == true) {
          authorizeUser(cookietoken);
        }
      }
    }
  }, [acct1, token1, cur1, showBalance]);

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
    setCookie('userName', authorizeData.authorize.authorize.fullname, {
      // secure: true,
      secure: window.location.protocol === 'https:',
      maxAge: 60 * 60 * 24 * 7, // 7 days 
      sameSite: 'none',
      domain: 'xhed.net',
    });
    setCookie('userEmail', authorizeData.authorize.authorize.email, {
      // secure: true,
      secure: window.location.protocol === 'https:',
      maxAge: 60 * 60 * 24 * 7, // 7 days 
      sameSite: 'none',
      domain: 'xhed.net',
    });
  }

  const handleLogout = () => {
    deleteCookie('userToken');
    deleteCookie('userEmail');
    deleteCookie('userName');
    router.replace('/');
    console.log("User token  and email cleared from this pc.");
  };

  const [isTrading, setIsTrading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const token = getCookie('userToken');


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
            <FaRegWindowClose className='toggle-icon' />
          ) : (
            <TbLayoutSidebarLeftExpandFilled className='toggle-icon' />
          )}
        </button>
        <div className='links-in-nav-bar'>
          <p className='text-white font-bold opacity-100  mt-4 link-text'>General</p>

          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'overview' ? 'active-link' : ''}`}
            onClick={() => handleClick('overview')}
          >
            <MdDashboard className={`link-icon ${activeLink === 'overview' ? 'active-link' : ''}`} /> <p className='link-text'>Overview</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'charts' ? 'active-link' : ''}`}
            onClick={() => handleClick('charts')}
          >
            < IoBarChartSharp className={`link-icon ${activeLink === 'charts' ? 'active-link' : ''}`} /> <p className='link-text '>Charts</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'signals' ? 'active-link' : ''}`}
            onClick={() => handleClick('signals')}
          >
            <FaExclamationTriangle className={`link-icon ${activeLink === 'signals' ? 'active-link' : ''}`} /> <p className='link-text'>Trading Signals</p>
          </Link>

          <p className='text-white font-bold opacity-100  mt-8 link-text'>User Details</p>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'settings' ? 'active-link' : ''}`}
            onClick={() => handleClick('settings')}
          >
            <MdSettingsApplications className={`link-icon ${activeLink === 'settings' ? 'active-link' : ''}`} /> <p className='link-text'>Acount Settings</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'profile' ? 'active-link' : ''}`}
            onClick={() => handleClick('profile')}
          >
            <MdAccountBox className={`link-icon ${activeLink === 'profile' ? 'active-link' : ''}`} /> <p className='link-text'>Profile</p>
          </Link>

          {/* <hr className='mt-4 mb-8 opacity-50 '></hr> */}
          <p className='text-white font-bold opacity-100  mt-8 link-text'>Account Perfomance</p>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'trade-history' ? 'active-link' : ''}`}
            onClick={() => handleClick('trade-history')}
          >
            <FaMoneyCheckAlt className={`link-icon ${activeLink === 'trade-history' ? 'active-link' : ''}`} /> <p className='link-text'>Your Trades</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'account-overview' ? 'active-link' : ''}`}
            onClick={() => handleClick('account-overview')}
          >
            <MdDashboard className={`link-icon text-m ${activeLink === 'account-overview' ? 'active-link' : ''}`} /> <p className='link-text'>Account Overview</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'strategy_comparizon' ? 'active-link' : ''}`}
            onClick={() => handleClick('strategy_comparizon')}
          >
            < IoBarChartSharp className={`link-icon text-m ${activeLink === 'strategy_comparizon' ? 'active-link' : ''}`} /> <p className='link-text '>Strategy Analysis</p>
          </Link>
          <Link
            href="/dashboard"
            className={`nav-links mt-4 ml-4 ${activeLink === 'strategt_vs_symbol' ? 'active-link' : ''}`}
            onClick={() => handleClick('strategt_vs_symbol')}
          >
            < IoBarChartSharp className={`link-icon text-m ${activeLink === 'strategt_vs_symbol' ? 'active-link' : ''}`} /> <p className='link-text'>Strategy & Symbol</p>
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
            <button className='toggle-nav-btn ml-8 sm:ml-2 xs:ml-2' onClick={toggleNav}>
              {!isNavVisible && <TfiMenu className='toggle-icon' />}
            </button>


            <Link href="/">
              <h1 className='logo'>FX AUTO</h1>
            </Link>
          </div>

          <div className='balance_div_in_hearder'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="flex items-center space-x-2">
              {/* Balance Label */}
              <div>
                <p className="text-sm emailinheader2 opacity-80">Balance</p>
                {/* Show Balance or Masked Data */}
                <div className='flex flex-row items-center justify-center'>
                  <p className="fulname">
                    {showBalance
                      ? (authorizeData ? (`${authorizeData.authorize.authorize.balance} ${authorizeData.authorize.authorize.currency}`
                      ) : (
                        <div role="status" className="max-w-sm animate-pulse">
                          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-32 mb-2 mt-2"></div>
                        </div>
                      )
                      ) : '##,###,###'}
                  </p>
                  <button
                    onClick={() => setShowBalance((prev) => !prev)}
                    className="p-1  "
                  >
                    {showBalance ? (
                      <GrFormViewHide className="text-white text-2xl fulname" />
                    ) : (
                      <GrFormView className="text-white text-2xl" />
                    )}

                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* div for execution time */}
          <div className='flex flex-row excution_time'>
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
            <div className='flex flex-row items-center justify-center names_and_email'>
              <div>
                <FaUserCircle className='face-icon' />

              </div>
              <div className='flex flex-col mr-8  '>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {(
                  // If authorization data is present, display dashboard
                  email ? (
                    <div>
                      <h1 className='fulname '>{userName}</h1>
                      <p className='text-sm emailinheader2 opacity-90 m-0 p-0'>{email}</p>

                    </div>
                  ) : (
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  )
                )}
              </div>
            </div>

            {/* Mobile content */}
            <div className="relative mobile-drop_down">
              {/* Hidden Checkbox for Toggling */}
              <input type="checkbox" id="dropdown-toggle" className="peer hidden" />

              {/* Dropdown Button */}
              <label
                htmlFor="dropdown-toggle"
                className="cursor-pointer text-white inline-flex items-center px-3 py-2"
              >
                <FaUserCircle className='face-icon' />
                <svg className="w-2.5 h-2.5 ml-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </label>

              {/* Dropdown Menu */}
              <div className="absolute right-2 top-12 mt-2 w-44 bg-white rounded shadow-md opacity-100 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-200">
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>{userName}</div>
                  <div className="font-medium truncate">{email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                  </li>
                </ul>
                <div className="py-2">
                  <button onClick={handleLogout} className="block px-4 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="over" className={`hidden-content ${activeLink === 'overview' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'overview' && <SupersetDashboard />}
        </div>

        <div id="over" className={`hidden-content ${activeLink === 'signals' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'signals' && <SignalsDashboard />}
        </div>

        <div className={`hidden-content ${activeLink === 'settings' ? 'settings-div' : ''}`}>
          {activeLink === 'settings' && <SettingsPage />}
        </div>

        <div className={`hidden-content ${activeLink === 'charts' ? 'settings-divv' : ''}`}>
          {activeLink === 'charts' && <TradingViewWidget />}
        </div>

        <div className={`hidden-content ${activeLink === 'trade-history' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'trade-history' && <TradeDashboard />}
        </div>

        {/* account overview dashboard */}
        <div className={`hidden-content ${activeLink === 'account-overview' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'account-overview' && < AccountDashboard />}
        </div>

        {/* strategy comparizon */}
        <div className={`hidden-content ${activeLink === 'strategy_comparizon' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'strategy_comparizon' && <StrategyDashboard />}
        </div>

        {/* strategy vs symbol comparizon */}
        <div className={`hidden-content ${activeLink === 'strategt_vs_symbol' ? 'superset-chatrs-div' : ''}`}>
          {activeLink === 'strategt_vs_symbol' && <StrategySymbolDashboard />}
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
