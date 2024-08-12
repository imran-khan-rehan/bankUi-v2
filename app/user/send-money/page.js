'use client';
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";

function TransferMoney() {
    const [recipient, setRecipient] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { user } = useContext(UserContext);

    const handleTransfer = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            setError("User is not authenticated. Please log in again.");
            return;
        }

        // Validate accountNumber
        const accountNumberValue = accountNumber.toString();
        if (!/^\d+$/.test(accountNumberValue)) {
            setError("Error: Account number must contain only digits.");
            return;
        }

        if (accountNumberValue.length < 10) {
            setError("Error: Account number must be at least 10 digits long.");
            return;
        }

        if (user.accountNumber === accountNumber) {
            setError("Error: Sender and receiver accounts cannot be the same.");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    sender: { id: user.id },
                    receiver: { accountNumber: parseInt(accountNumberValue) },
                    amount: parseFloat(amount),
                    date: new Date().toISOString()
                })
            });

            if (response.ok) {
                const transaction = await response.json();
                setSuccessMessage(`Successfully transferred $${amount} to account ${accountNumberValue}.`);
                setError(null);
            } else {
                const errorData = await response.text(); // Read the response text or json for error details

                setError(errorData);
                setSuccessMessage(null);
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again.");
            setSuccessMessage(null);
        }

    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-5">
            <div className="relative h-screen bg-cover bg-center text-center bg-white bg-opacity-85 bg-blend-overlay" style={{ backgroundImage: "url('/icons/SENDMONEY/gmBg.jpg')" }}>
                <div className="w-full h-7 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/icons/SENDMONEY/gmBg.jp')" }}></div>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">Secure Money Transfer</h1>
                    <p className="text-xl">Transfer your money safely and freely.</p>
                </div>
                <div className="flex flex-wrap justify-between gap-10 bg-white w-4/5 p-8 mx-auto text-center mb-10 lg:flex-nowrap">
                    <div className="flex flex-col w-full lg:w-1/2">
                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-8 w-full border border-gray-200">
                            <form onSubmit={handleTransfer} className="space-y-5">
                                <div>
                                    <label className="block text-lg font-medium">Purpose of Payment (Optional)</label>
                                    {/* <input
                                        type="text"
                                        value={recipient}
                                        onChange={(e) => { setRecipient(e.target.value); setError(null); }}
                                        className="mt-1 block w-full p-3 bg-white bg-opacity-60 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"

                                    /> */}
                                    <select className="mt-1 block w-full p-3 bg-white bg-opacity-60 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 ">
                                        <option>others</option>
                                        <option>Bill and Payments</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Recipient Account Number</label>
                                    <input
                                        type="text"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        className="mt-1 block w-full p-3 bg-white bg-opacity-60 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium">Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 block w-full p-3 bg-white bg-opacity-60 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                                >
                                    Transfer Money
                                </button>
                                {error && <p className="text-red-500 mt-3">{error}</p>}
                                {successMessage && <p className="text-green-500 mt-3">{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-[45%] flex items-center hidden lg:flex">
                        <img src="/icons/SENDMONEY/add.jpeg" alt="Money Transfer" className="w-full" />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-11 bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/curved-bottom.svg')" }}></div>
            </div>
        </main>
    );
};

export default TransferMoney;
