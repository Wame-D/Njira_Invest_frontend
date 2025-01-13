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
  }, [acct1, token1, cur1, cookietoken]);

  const authorizeUser = async (token: string) => {
    console.log("Sending token:", token);

    try {
      const response = await fetch('https://forex1-ul7ikrzn.b4a.run/authorize/', {
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

  const handleLogout = () => {
    deleteCookie('userToken');
    router.replace('/');
    console.log("User token cleared from local storage.");
  };

  const [isTrading, setIsTrading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const token = getCookie('userToken');

  // Fetch the start_time when the page loads
  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const response = await fetch('https://forex1-ul7ikrzn.b4a.run/start-time/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          const startTime = new Date(data.start_time).getTime();
          const trading = data.trading;
          setStartTime(startTime);
          const targetDate = new Date('2025-01-06T10:00:00').getTime();
          if (startTime >= targetDate) {
            if (trading) {
              setIsTrading(true);
            }
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


  const handleStart = async () => {
    try {
      const response = await fetch('https://forex1-ul7ikrzn.b4a.run/update-trading/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          trading: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Response:', data);
        alert('started trading successfully!');
      } else {
        console.error('Error:', data);
        alert('Error  Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error connecting to the server.');
    }
    setIsTrading(true);
    const start = Date.now();
    // Record the start time in milliseconds
    setStartTime(start);
    // Reset the elapsed time
    setCurrentTime(0);
  };

  const handleStop = async () => {
    setIsTrading(false);

    try {
      const response = await fetch('https://forex1-ul7ikrzn.b4a.run/update-trading/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          trading: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Response:', data);
        alert('started trading successfully!');
      } else {
        console.error('Error:', data);
        alert('Error  Please try again.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error connecting to the server.');
    }
  };

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
  return (
    <div className='dashoard'>
      <div id='nav-bar'>
        <Link href="/">
          <h1 className='logo'>FX TRADING</h1>
        </Link>

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
            className={`nav-links mt-8 ${activeLink === 'analytics' ? 'active-link' : ''}`}
            onClick={() => handleClick('analytics')}
          >
            <FaChartPie className={`link-icon ${activeLink === 'analytics' ? 'active-link' : ''}`} /> <p className='link-text'>Analytics</p>
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
      <div className='dashboard-conntent'>
        <div className='small-header'>
          <h3>Main Dashboard</h3>
          <div className='quick-links'>
            <Link href="/" className='quick-links-content'>
              Home
            </Link>
            <Link href="/contact" className='quick-links-content'>
              Contacts
            </Link>
          </div>
          <div>
            <button
              onClick={handleStart}
              disabled={isTrading}
              className={`button ${isTrading ? "disabled" : ""}`}
            >
              Start Trading
            </button>
            <button
              onClick={handleStop}
              disabled={!isTrading}
              className={`button ${!isTrading ? "disabled" : ""}`}
            >
              Stop Trading
            </button>
          </div>
        </div>
        <div className='accounts-info'>
          <div className='names-div'>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {(
              // If authorization data is present, display dashboard
              authorizeData ? (
                <div>
                  <h2>Personal Info.</h2>
                  <h1 className='fulname'>{authorizeData.authorize.authorize.fullname}</h1>
                  <p className='text-m emailinheader2 opacity-90'>{authorizeData.authorize.authorize.email}</p>

                </div>
              ) : (
                <p className='text-center'>Loading authorization...</p>
              )
            )}
          </div>
          <div className='names-div'>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {(
              // If authorization data is present, display dashboard
              authorizeData ? (
                <div>
                  <h2>My Balance</h2>
                  <h1>{authorizeData.authorize.authorize.balance} {authorizeData.authorize.authorize.currency}</h1>
                </div>
              ) : (
                <p className='text-center'>Getting Balances...</p>
              )
            )}
          </div>
          <div className='names-div'>
            {!isTrading && currentTime == 0 && (
              <div>
                <h2>Bot execution time: </h2>
                <h1>0.0.0</h1>
              </div>
            )}

            {isTrading && (
              <div>
                <h2>Bot is running for: </h2>
                <h1 id='runing-time'>{formatDuration(currentTime)}</h1>
              </div>
            )}

            {startTime > 0 && (
              <div>
                <p className='text-m emailinheader2 opacity-90'>Started at: {new Date(startTime).toLocaleString()}</p>
              </div>
            )}

            {!isTrading && currentTime > 0 && (
              <div>
                <h2>Stopped after: </h2>
                <p className='text-m emailinheader2 opacity-90'>{formatDuration(currentTime)}</p>
              </div>
            )}
          </div>
        </div>
        <div id="over" className={`hidden-content ${activeLink === 'overview' ? 'superset-chatrs-div' : ''}`}>
          <SupersetDashboard />
        </div>

        <div className={`hidden-content ${activeLink === 'settings' ? 'settings-div' : ''}`}>
          <SettingsPage />
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

