'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { UserContext } from '@/context/UserContext';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const MoneyChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Time periods
    datasets: [
      {
        label: 'Money Flow',
        data: [], // Money values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !user.token) {
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const transactions = await response.json();
          console.log("all transactions are ", transactions);
          processTransactions(transactions);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user]);

  const processTransactions = (transactions) => {
    const labels = [];
    const data = [];
    let balance = 0;

    // Sort transactions by date
    //transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    transactions.forEach((transaction) => {
      const { date, amount, sender, receiver } = transaction;
      labels.push(new Date(date).toLocaleDateString()); // Format date as needed

      // Update balance based on transaction type
      if (user.id === receiver.id) {
        balance += amount;
      } else if (user.id === sender.id) {
        balance -= amount;
      }

      data.push(balance);
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Money Flow',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Money Flow Chart',
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoneyChart;
