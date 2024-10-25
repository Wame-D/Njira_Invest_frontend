// 'use client';
// import { useEffect, useState } from 'react';

// import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
// import "./dash.css";
// import Header from '../header/page';

// interface UserAccount {
//   account: string;
//   token: string;
//   currency: string;
// }

// interface AuthorizeResponse {
//   authorize: {
//     account_list: {
//       account_type: string;
//       loginid: string;
//       currency: string;
//       is_virtual: number;
//       trading: Record<string, unknown>;
//     }[];
//     balance: number;
//     email: string;
//     currency: string;
//     fullname: string;
//     loginid: string;
//     scopes: string[];
//     country: string;
//     local_currencies: { [key: string]: unknown };
//     user_id: number;
//     landing_company_fullname: string;
//   };
// }

// const Dashboard = ({ searchParams }: { searchParams: Record<string, string> }) => {
//   const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const app_id = 64953;
//   const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
//   const api = new DerivAPIBasic({ connection });

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
//     try {
//       const authorizeResponse = await api.authorize(token);
//       if (authorizeResponse.error) {
//         throw new Error(authorizeResponse.error.message);
//       }
//       setAuthorizeData(authorizeResponse);
//       console.log("Authorize Response:", authorizeResponse); // Log to check the structure
//     } catch (error) {
//       setError('Error during authorization');
//       console.error('Authorization error:', error);
//     }
//   };

//   return (
//     <>

//       <div className='w-full min-h-screen dashboard flex  justify-center'>
//       <Header />

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         {authorizeData ? (

//           <div className='w-full h-fit  flex flex-col justify-center insidediv'>
//             <div className='w-ful flex flex-col justify-center personalinfo-div'>
//               <h1 className='fulname'> {authorizeData.authorize.fullname}</h1>
//               <p className='text-m text-black opacity-70'> {authorizeData.authorize.email}</p>
//             </div>
//             <hr></hr>
//             <div className=' mt-4 balancediv'>
//               <h2>My Balance</h2>
//               <h1>{authorizeData.authorize.balance} {authorizeData.authorize.currency}</h1>
//               <div className='w-ful  flex  justify-center mt-4 pt-2 small-info'>
//                 <p className='text-m text-black opacity-70 '>
//                   <strong>Account Type:</strong> {authorizeData.authorize.account_list[0].account_type}
//                 </p>
//                 <p className='text-m text-black opacity-70 '><strong> Login ID:</strong> {authorizeData.authorize.loginid}</p>
//                 <p className='text-m text-black opacity-70 '><strong> Country:</strong> {authorizeData.authorize.country}</p>
//                 <p className='text-m text-black opacity-70 '><strong> Local Currencies:</strong> {Object.keys(authorizeData.authorize.local_currencies).join(', ')}</p>
//                 <p className='text-m text-black opacity-70 '><strong> User ID:</strong> {authorizeData.authorize.user_id}</p>
//                 <p className='text-m text-red-500 opacity-70 '><strong className='text-red-500'> Brocker:</strong> {authorizeData.authorize.landing_company_fullname}</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Loading authorization...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

'use client';
import { useEffect, useState } from 'react';
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import "./dash.css";
import Header from '../header/page';

interface UserAccount {
  account: string;
  token: string;
  currency: string;
}

interface AuthorizeResponse {
  authorize: {
    account_list: {
      account_type: string;
      loginid: string;
      currency: string;
      is_virtual: number;
      trading: Record<string, unknown>;
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
  };
}

const Dashboard = ({ searchParams }: { searchParams: Record<string, string> }) => {
  const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const app_id = 64953;
  const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
  const api = new DerivAPIBasic({ connection });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connection.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection established.");
    };

    connection.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed.");
    };

    // connection.onerror = (error) => {
    //   console.error("WebSocket error:", error);
    // };

    connection.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket connection error. Please check CORS settings.");
    };
    

    const { acct1, token1, cur1, acct2, token2, cur2 } = searchParams;
    const accounts: UserAccount[] = [
      { account: acct1, token: token1, currency: cur1 },
      { account: acct2, token: token2, currency: cur2 },
    ];

    if (isConnected && accounts.length > 0) {
      // accounts.forEach(account => authorizeUser(account.token));
      authorizeUser(accounts[0].token);
    }

    // Cleanup function
    return () => {
      connection.close();
    };
  }, [searchParams, isConnected]);

  const authorizeUser = async (token: string) => {
    try {
      const authorizeResponse = await api.authorize(token);
      if (authorizeResponse.error) {
        throw new Error(authorizeResponse.error.message);
      }
      setAuthorizeData(authorizeResponse);
      console.log("Authorize Response:", authorizeResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      setError(`Error during authorization: ${errorMessage}`);
      console.error('Authorization error:', error);
    }
  };

  return (
    <>
      <div className='w-full min-h-screen dashboard flex justify-center'>
        <Header />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {authorizeData ? (
          <div className='w-full h-fit flex flex-col justify-center insidediv'>
            <div className='w-full flex flex-col justify-center personalinfo-div'>
              <h1 className='fullname'> {authorizeData.authorize.fullname}</h1>
              <p className='text-m text-black opacity-70'> {authorizeData.authorize.email}</p>
            </div>
            <hr />
            <div className='mt-4 balancediv'>
              <h2>My Balance</h2>
              <h1>{authorizeData.authorize.balance} {authorizeData.authorize.currency}</h1>
              <div className='w-full flex justify-center mt-4 pt-2 small-info'>
                <p className='text-m text-black opacity-70 '>
                  <strong>Account Type:</strong> {authorizeData.authorize.account_list[0].account_type}
                </p>
                <p className='text-m text-black opacity-70 '><strong> Login ID:</strong> {authorizeData.authorize.loginid}</p>
                <p className='text-m text-black opacity-70 '><strong> Country:</strong> {authorizeData.authorize.country}</p>
                <p className='text-m text-black opacity-70 '><strong> Local Currencies:</strong> {Object.keys(authorizeData.authorize.local_currencies).join(', ')}</p>
                <p className='text-m text-black opacity-70 '><strong> User ID:</strong> {authorizeData.authorize.user_id}</p>
                <p className='text-m text-red-500 opacity-70 '><strong className='text-red-500'> Broker:</strong> {authorizeData.authorize.landing_company_fullname}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading authorization...</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
