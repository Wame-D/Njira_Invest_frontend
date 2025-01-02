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

  useEffect(() => {
    if (acct1 && token1 && cur1) {
      const accounts: UserAccount[] = [
        { account: acct1, token: token1, currency: cur1 },
      ];
      authorizeUser(accounts[0].token);
    } else {
      router.replace('/');
      alert("No tocken found please login first1");
    }
  }, [acct1, token1, cur1]);

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
        // alert(errorData);
        throw new Error(`Authorization failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Authorization successful:', data);

      // Save the token and related data to localStorage
      localStorage.setItem('userToken', token);
      setAuthorizeData(data);
    } catch (error) {
      setError('Error during authorization');
      console.error('Authorization error:', error);
      // alert(error);
    }
  };

  // to handle stop and start
  const [isTrading, setIsTrading] = useState(false); // Initial state: not trading

  const handleStart = () => {
    setIsTrading(true); // Enable trading
  };

  const handleStop = () => {
    setIsTrading(false); // Disable trading
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("userToken");
    router.replace('/');
    console.log("User token cleared from local storage.");
  };

  return (
    <div className='dashoard'>
      <div id='nav-bar'>
        <Link href="/">
          <h1 className='logo'>FX TRADING</h1>
        </Link>

        <div className='links-in-nav-bar'>
          <Link href="/about" className='nav-links mt-8'>
            <MdDashboard className='link-icon' /> <p className='link-text'>Overview   </p>
          </Link>
          <Link href="/about" className='nav-links mt-8'>
            <FaChartPie className='link-icon' /> <p className='link-text'>Analytics   </p>
          </Link>
          <Link href="/about" className='nav-links mt-8'>
            <AiOutlineHistory className='link-icon' /> <p className='link-text'>Trade History   </p>
          </Link>
          <Link href="/about" className='nav-links mt-8'>
            <FaExclamationTriangle className='link-icon' /> <p className='link-text'>Risk Analysis   </p>
          </Link>
          <Link href="/about" className='nav-links mt-8'>
            <FaCog className='link-icon' /> <p className='link-text'>Settings   </p>
          </Link>
          <Link href="/about" className='nav-links mt-8'>
            <FaUserCircle className='link-icon' /> <p className='link-text'>Profile   </p>
          </Link>

          <Link href="" className='logout-link mt-4' onClick={handleLogout}>
            <FiLogOut className='logout-icon' /> <p className='logout-text'>Logout  </p>
          </Link>
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
                <p className='text-center'>Loading authorization...</p>
              )
            )}
          </div>
        </div>
        <div className='superset-chatrs-div'>
        <SupersetDashboard/>
        </div>
      </div>

    </div>
  )
};

export default Dashboard;

// {error && <p style={{ color: 'red' }}>{error}</p>}

// {(
//   // If authorization data is present, display dashboard
//   authorizeData ? (
//     <div className='w-full h-fit flex flex-col justify-center insidediv'>
//       <div className='w-full dashboard-imge'>
//         <Header />
//         <div className='w-ful flex justify-center items-center personalinfo-div'>
//           <div className='namesandemail'>
//             <h1 className='fulname'>{authorizeData.authorize.authorize.fullname}</h1>
//             <p className='text-m emailinheader opacity-90'>{authorizeData.authorize.authorize.email}</p>
//           </div>
//           <div className='w-fit h-fit flex top-links'>
//             <button className="links-in-top flex flex row justify-items-center items-center inside-utton">
//               Start Trading &gt;
//             </button>
//             <a className="links-in-top flex flex row justify-items-center items-center inside-utton2" href='/#how-it-work'>
//               Current Analysis &gt;
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className='mt-4 balancediv'>
//         <h2>My Balance</h2>
//         <h1>{authorizeData.authorize.authorize.balance} {authorizeData.authorize.authorize.currency}</h1>
//         <div className='w-ful flex justify-center mt-4 pt-2 small-info'>
//           <p className='text-m text-black opacity-70'>
//             <strong>Account Type:</strong> {authorizeData.authorize.authorize.account_list[0].account_type}
//           </p>
//           <p className='text-m text-black opacity-70'><strong>Login ID:</strong> {authorizeData.authorize.authorize.loginid}</p>
//           <p className='text-m text-black opacity-70'><strong>Country:</strong> {authorizeData.authorize.authorize.country}</p>
//           <p className='text-m text-black opacity-70'><strong>Local Currencies:</strong> {Object.keys(authorizeData.authorize.authorize.local_currencies).join(', ')}</p>
//           <p className='text-m text-black opacity-70'><strong>User ID:</strong> {authorizeData.authorize.authorize.user_id}</p>
//           <p className='text-m text-red-500 opacity-70'><strong className='text-red-500'>Broker:</strong> {authorizeData.authorize.authorize.landing_company_fullname}</p>
//           <p className='text-m text-black opacity-70'>{authorizeData.authorize.authorize.account_list[0].account_category} account</p>
//         </div>
//       </div>
//       <div className='mt-8 balancediv'>
//         <h2>Current Analysis</h2>
//         <SupersetDashboard />
//       </div>

//       <div className='mt-8 balancediv'>
//         <h2>Trade History</h2>
//       </div>

//       <div className='mt-8 balancediv'>
//         <h2>Profit and Loss</h2>
//       </div>
//     </div>
//   ) : (
//     <p className='mt-40'>Loading authorization...</p>
//   )
// )}
