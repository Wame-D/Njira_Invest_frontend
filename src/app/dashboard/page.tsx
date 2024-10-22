'use client';
import "./dash.css";
import { useEffect, useState } from 'react';

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

const Dashboard = ({ searchParams }: { searchParams: Record<string, string> }) => {
  const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { acct1, token1, cur1, acct2, token2, cur2 } = searchParams;

    const accounts: UserAccount[] = [
      { account: acct1, token: token1, currency: cur1 },
      { account: acct2, token: token2, currency: cur2 },
    ];

    if (accounts.length > 0) {
      authorizeUser(accounts[0].token);
    }
  }, [searchParams]);

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
      setAuthorizeData(data);
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
