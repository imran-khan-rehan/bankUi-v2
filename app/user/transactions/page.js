'use client';
import React, { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Import icons for sent and received
import { useRouter } from "next/navigation";
import { UserContext } from '@/context/UserContext';

// Array of light color shades
const colors = [
  "bg-blue-100",
  "bg-green-100",
  "bg-red-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-teal-100",
  "bg-gray-100",
];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {

      // if (!user || !user.token) {
      //   router.push("/login");
      //   return;
      // }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/users/${user.id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-5">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Transaction History</h1>
        <p className="text-xl">Here is a record of your recent transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {transactions.map((transaction, index) => {
          // Choose color based on index, or use Math.random() for random colors
          const colorClass = colors[index % colors.length];
          const isSent = transaction.sender.id === user.id && transaction.receiver.id !== user.id;
          const icon = isSent ? <FaArrowUp className="text-red-500" /> : <FaArrowDown className="text-green-500" />;
          const transactionType = isSent ? 'Sent' : 'Received';

          return (
            <div
              key={transaction.id}
              className={`${colorClass} p-5 rounded-md shadow-lg transition-transform transform hover:scale-105`}
            >
              <div className="flex items-center mb-3">
                <span className="text-lg font-bold mr-2">{isSent ? transaction.receiver.accountHolder.name : transaction.sender.accountHolder.name}</span>
                {icon}
              </div>
              <div className="flex justify-between mb-3">
                <div className="bg-white p-2 rounded-md w-full">
                  <span className="text-sm text-gray-700">Account:</span>
                  <span className="font-semibold text-lg ml-2">{isSent ? transaction.receiver.accountNumber : transaction.sender.accountNumber}</span>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}</span>
              </div>
              <div className="text-lg font-semibold">{transaction.amount}</div>
              <div className="text-sm text-gray-500">{transactionType}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
