'use client';

import Header from '@/components/header/page';
import { useState, useEffect } from 'react';

export default function AIOnCenter() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [cards, setCards] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.result);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 1500);
  };

  useEffect(() => {
    fetch('/api/cards')
      .then((res) => res.json())
      .then((data) => setCards(data.cards || []));
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      <Header />
      <h1 className="text-6xl font-bold mb-6">Optimize Your Signals with AI Insights</h1>
      <p className='w-[50%] text-gray-600 text-center mt-4 mb-8'>Take your trading strategy to the next level. Enter your signal and let our AI provide refined suggestions, highlight potential improvements, and uncover patterns you might have missed. It's like having a second brain focused on smarter, data-driven decisions.</p>

      <div className='w-[80%] h-[30vh] bg-gray-100 rounded-lg gap-8 border-2 flex flex-col items-center justify-center shadow-m'>

        {/* fomr input */}
        <form onSubmit={handleSubmit} className="w-[80%] h-[5rem]  flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300  rounded-l-full"
            placeholder="Enter your signal..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white text-2xl font-bold w-[7rem] px-4 py-2 rounded-r-full">
            Refine 
          </button>
        </form>

        {response && (
          <div className="w-full max-w-xl bg-gray-100 p-4 rounded relative mb-8">
            <p>{response}</p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 text-sm text-blue-600"
            >
              Copy
            </button>
            {copySuccess && <span className="text-green-500 text-sm">{copySuccess}</span>}
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 px-4 pb-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="min-w-[200px] p-4 bg-blue-100 rounded shadow-sm flex-shrink-0"
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
