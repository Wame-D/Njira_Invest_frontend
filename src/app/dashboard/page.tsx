'use client';
// import { useEffect, useState } from 'react';

// // import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
// import "./dash.css";
// import Header from '../dashboard-header/page';

// interface UserAccount {
//   account: string;
//   token: string;
//   currency: string;
// }

// interface AuthorizeResponse {
//   authorize: {
//     authorize: {
//       account_list: {
//         account_type: string;
//         loginid: string;
//         currency: string;
//         is_virtual: number;
//         trading: Record<string, unknown>;
//         account_category: string;
//       }[];
//       balance: number;
//       email: string;
//       currency: string;
//       fullname: string;
//       loginid: string;
//       scopes: string[];
//       country: string;
//       local_currencies: { [key: string]: unknown };
//       user_id: number;
//       landing_company_fullname: string;
//       account_category: string;
//     };
//   };
// }

// const Dashboard = ({ searchParams }: { searchParams: Record<string, string> }) => {
//   const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     const { acct1, token1, cur1, acct2, token2, cur2 } = searchParams;

//     const accounts: UserAccount[] = [
//       { account: acct1, token: token1, currency: cur1 },
//       { account: acct2, token: token2, currency: cur2 },
//     ];

//     if (accounts.length > 0) {
//       authorizeUser(accounts[0].token);
//     }
//   }, [searchParams]);

//   const authorizeUser = async (token: string) => {
//     console.log("Sending token:", token); 

//     try {
//       const response = await fetch('https://forex1-ul7ikrzn.b4a.run/authorize/', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });

//       if (!response.ok) {
//         // Log additional info for debugging
//         const errorData = await response.json();
//         console.error('Authorization failed:', errorData);
//         throw new Error(`Authorization failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Authorization successful:', data);
//       setAuthorizeData(data);
//     } catch (error) {
//       setError('Error during authorization');
//       console.error('Authorization error:', error);
//     }
//   };

//   return (
//     <>

//       <div className='w-full min-h-screen dashboard flex  justify-center'>


//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         {authorizeData ? (

//           <div className='w-full h-fit  flex flex-col justify-center insidediv'>
//             <div className='w-full dashboard-imge'>
//               <Header />
//               <div className='w-ful flex justify-center items-center personalinfo-div'>
//                 <div className='namesandemail'>
//                   <h1 className='fulname'> {authorizeData.authorize.authorize.fullname}</h1>
//                   <p className='text-m emailinheader opacity-90'> {authorizeData.authorize.authorize.email}</p>
//                 </div>
//                 <div className='w-fit h-fit flex  top-links  '>
//                   <button className="links-in-top flex flex row  justify-items-center items-center inside-utton " >
//                     Start Trading  &gt;
//                   </button>

//                   <a className="links-in-top flex flex row  justify-items-center items-center inside-utton2 " href='/#how-it-work'>
//                     Current Analysis  &gt;
//                   </a>
//                 </div>
//               </div>


//             </div>

//             <div className=' mt-4 balancediv'>
//               <h2>My Balance</h2>
//               <h1>{authorizeData.authorize.authorize.balance} {authorizeData.authorize.authorize.currency}</h1>
//               <div className='w-ful  flex  justify-center mt-4 pt-2 small-info'>
//                 <p className='text-m text-black opacity-70 '>
//                   <strong>Account Type:</strong> {authorizeData.authorize.authorize.account_list[0].account_type}
//                 </p>
//                 <p className='text-m text-black opacity-70 '><strong> Login ID:</strong> {authorizeData.authorize.authorize.loginid}</p>
//                 <p className='text-m text-black opacity-70 '><strong> Country:</strong> {authorizeData.authorize.authorize.country}</p>
//                 <p className='text-m text-black opacity-70 '><strong> Local Currencies:</strong> {Object.keys(authorizeData.authorize.authorize.local_currencies).join(', ')}</p>
//                 <p className='text-m text-black opacity-70 '><strong> User ID:</strong> {authorizeData.authorize.authorize.user_id}</p>
//                 <p className='text-m text-red-500 opacity-70 '><strong className='text-red-500'> Brocker:</strong> {authorizeData.authorize.authorize.landing_company_fullname}</p>
//                 <p className='text-m text-black opacity-70 '>{authorizeData.authorize.authorize.account_list[0].account_category} account</p>
//               </div>
//             </div>

//             <div className=' mt-8 balancediv'>
//               <h2>Current Analysis</h2>
//             </div>

//             <div className=' mt-8 balancediv'>
//               <h2>Trade History</h2>
//             </div>

//             <div className=' mt-8 balancediv'>
//               <h2>Profit and Loss</h2>
//             </div>
//           </div>
//         ) : (
//           <p className='mt-40'>Loading authorization...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
'use client'; // Add this directive at the top of the file

import { useEffect, useState } from 'react';
import "./dash.css";
import Header from '../dashboard-header/page';

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

  // Initialize the search parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);  // This effect runs only once when the component mounts

  // Get the query parameters after the searchParams state is set
  const acct1 = searchParams?.get('acct1');
  const token1 = searchParams?.get('token1');
  const cur1 = searchParams?.get('cur1');
  const acct2 = searchParams?.get('acct2');
  const token2 = searchParams?.get('token2');
  const cur2 = searchParams?.get('cur2');

  // Effect to handle the authorization request when query parameters are available
  useEffect(() => {
    if (acct1 && token1 && cur1 && acct2 && token2 && cur2) {
      const accounts: UserAccount[] = [
        { account: acct1, token: token1, currency: cur1 },
        { account: acct2, token: token2, currency: cur2 },
      ];
      authorizeUser(accounts[0].token);
    } else {
      setError('Error: Missing query parameters');
    }
  }, [acct1, token1, cur1, acct2, token2, cur2]); // Trigger effect only when query parameters change

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
    }
  };

  return (
    <div className='w-full min-h-screen dashboard flex justify-center'>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {authorizeData ? (
        <div className='w-full h-fit flex flex-col justify-center insidediv'>
          <div className='w-full dashboard-imge'>
            <Header />
            <div className='w-ful flex justify-center items-center personalinfo-div'>
              <div className='namesandemail'>
                <h1 className='fulname'>{authorizeData.authorize.authorize.fullname}</h1>
                <p className='text-m emailinheader opacity-90'>{authorizeData.authorize.authorize.email}</p>
              </div>
              <div className='w-fit h-fit flex top-links'>
                <button className="links-in-top flex flex row justify-items-center items-center inside-utton">
                  Start Trading &gt;
                </button>
                <a className="links-in-top flex flex row justify-items-center items-center inside-utton2" href='/#how-it-work'>
                  Current Analysis &gt;
                </a>
              </div>
            </div>
          </div>

          <div className='mt-4 balancediv'>
            <h2>My Balance</h2>
            <h1>{authorizeData.authorize.authorize.balance} {authorizeData.authorize.authorize.currency}</h1>
            <div className='w-ful flex justify-center mt-4 pt-2 small-info'>
              <p className='text-m text-black opacity-70'>
                <strong>Account Type:</strong> {authorizeData.authorize.authorize.account_list[0].account_type}
              </p>
              <p className='text-m text-black opacity-70'><strong>Login ID:</strong> {authorizeData.authorize.authorize.loginid}</p>
              <p className='text-m text-black opacity-70'><strong>Country:</strong> {authorizeData.authorize.authorize.country}</p>
              <p className='text-m text-black opacity-70'><strong>Local Currencies:</strong> {Object.keys(authorizeData.authorize.authorize.local_currencies).join(', ')}</p>
              <p className='text-m text-black opacity-70'><strong>User ID:</strong> {authorizeData.authorize.authorize.user_id}</p>
              <p className='text-m text-red-500 opacity-70'><strong className='text-red-500'>Broker:</strong> {authorizeData.authorize.authorize.landing_company_fullname}</p>
              <p className='text-m text-black opacity-70'>{authorizeData.authorize.authorize.account_list[0].account_category} account</p>
            </div>
          </div>

          <div className='mt-8 balancediv'>
            <h2>Current Analysis</h2>
          </div>

          <div className='mt-8 balancediv'>
            <h2>Trade History</h2>
          </div>

          <div className='mt-8 balancediv'>
            <h2>Profit and Loss</h2>
          </div>
        </div>
      ) : (
        <p className='mt-40'>Loading authorization...</p>
      )}
    </div>
  );
};

export default Dashboard;
