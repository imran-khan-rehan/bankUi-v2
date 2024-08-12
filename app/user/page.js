'use client';
import { useEffect, useState } from "react";
import MoneyChart from "@/components/MoneyChart";

// import withAuth from "@/components/withAuth";
const Home = () => {
  // State to manage chart visibility
  const [token, setToken] = useState(null);
  // Toggle chart visibility
  const [showAmount, setShowAmount] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [account, setAccount] = useState('');
  let user = null;
  // Toggle amount visibility
  const handleCheckBalanceClick = () => {
    setShowAmount(!showAmount);
  };
  useEffect(() => {
    const fetchBalance = async () => {
      const data = sessionStorage.getItem('user');
      if (data) {
        user = JSON.parse(data);
        setToken(user.token);
        console.log(user.token);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/users/${user.id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        });

        console.log(response);
        if (response.ok) {
          const balanceData = await response.json();
    
          console.log(balanceData);
          setBalance(balanceData.balance);
          setAccount(balanceData.accountNumber);
        } else {
          console.error("Failed to fetch balance");
        }
      }
    };

    fetchBalance();
  }, []);
  return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <div className='shadow-custom bg-white rounded-md flex flex-col gap-5 p-5'>
        <div className='text-3xl font-semibold'>Hi Imran!</div>
        <div> Your account number: {account}</div>
        <div className='font-normal text-lg text-[#222F43]'>Welcome back to your trusted and efficient bank app.</div>
        <div
          className="cursor-pointer font-semibold text-lg px-5 py-3 bg-yellow-500 w-fit rounded-md text-white"
          onClick={handleCheckBalanceClick}
        >
          Check Balance
        </div>
        {/* <p className=" text-black">{token}</p> */}
      </div>
      {showAmount && (
        <div className="text-2xl font-semibold mt-5">
          Your balance is: ${balance}
        </div>
      )}
      <MoneyChart />


    </main>
  );
}
export default Home;
