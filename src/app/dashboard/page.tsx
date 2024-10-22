'use client';
import "./dash.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface UserAccount {
  account: string;
  token: string;
  currency: string;
}

interface AuthorizeResponse {
  account_list: {
    account_type: string;
    loginid: string;
    currency: string;
    is_virtual: number;
    trading: Record<string, unknown>;
  }[];
  balance: number;
  email: string;
  fullname: string;
  loginid: string;
  scopes: string[];
  user_id: number;
}

const Dashboard = () => {
  const router = useRouter();
  const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { acct1, token1, cur1, acct2, token2, cur2 } = router.query;

      // Map query parameters to user accounts
      const accounts: UserAccount[] = [
        { account: acct1 as string, token: token1 as string, currency: cur1 as string },
        { account: acct2 as string, token: token2 as string, currency: cur2 as string },
      ];

      // Automatically authorize the first account's token
      if (accounts.length > 0) {
        authorizeUser(accounts[0].token);
      }
    }
  }, [router.isReady, router.query]);

  // Function to authorize user with selected account token
  const authorizeUser = async (token: string) => {
    try {
      const response = await fetch('https://api.deriv.com/api/v1/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorize: token }),
      });

      if (!response.ok) {
        throw new Error('Authorization failed');
      }

      const data: AuthorizeResponse = await response.json();
      setAuthorizeData(data);  // Handle the API response data
    } catch (error) {
      setError('Error during authorization');
      console.error('Error during authorization:', error);
    }
  };

  return (
    <div>
      <h1>User Authorization</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {authorizeData ? (
        <div>
          <h2>User Details</h2>
          <p><strong>Full Name:</strong> {authorizeData.fullname}</p>
          <p><strong>Email:</strong> {authorizeData.email}</p>
          <p><strong>Balance:</strong> {authorizeData.balance}</p>
          <p><strong>Login ID:</strong> {authorizeData.loginid}</p>
          {/* <p><strong>Currency:</strong> {authorizeData.currency}</p> */}
        </div>
      ) : (
        <p>Loading authorization...</p>
      )}
    </div>
  );
};

export default Dashboard;