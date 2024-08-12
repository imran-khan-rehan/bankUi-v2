'use client';
import React, { useState, useEffect } from 'react';

const BalanceModal = ({ user, isOpen, onClose, onSave, token }) => {
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/balance/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId: user.id, amount: parseFloat(amount) })
    });

    if (response.ok) {
      onSave();
      onClose();
    } else {
      setError('Failed to add amount');
    }
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed w-screen z-20 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Amount</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              min={0}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
        {error && <div className='text-red-500 mt-2'>{error}</div>}
      </div>
    </div>
  );
};

const AdminBalancesPage = () => {
  const [balances, setBalances] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setToken(storedUser.token);
      fetchBalances(storedUser.token);
      
    }
  }, []);

  const fetchBalances = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBalances(data);
      } else {
        console.error('Failed to fetch balances');
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleAddAmount = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  if (loading) {
    return <div>Loading ...</div>
  }
  return (
    <main className="min-h-screen p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Admin Dashboard - Balances</h1>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Serial</th>
            <th className="py-2 px-4 border-b text-center">Account Number</th>
            <th className="py-2 px-4 border-b text-center">Email</th>
            <th className="py-2 px-4 border-b text-center">Amount</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance, index) => {
            if (balance.accountHolder.email === "admin@admin.com") {
              return null; 
            }

            return (
              <tr key={balance.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{balance.accountHolder.accountNumber}</td>
                <td className="py-2 px-4 border-b text-center">{balance.accountHolder.email}</td>
                <td className="py-2 px-4 border-b text-center">{balance.amount}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleAddAmount(balance.accountHolder)} className="text-blue-500 mr-2">Add Amount</button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>

      {isModalOpen && (
        <BalanceModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedUser(null); }}
          onSave={() => fetchBalances(token)}
          token={token}
        />
      )}
    </main>
  );
};

export default AdminBalancesPage;
