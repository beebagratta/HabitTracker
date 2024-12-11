import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Accounts = () => {
    const [account, setAccount] = useState([]);

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem("Account")) || [];
        setAccount(storedAccounts);
    }, []);
    const deleteAccount = (email) => {
        const updatedAccounts = account.filter(acc => acc.Email !== email);
        setAccount(updatedAccounts);
        localStorage.setItem("Account", JSON.stringify(updatedAccounts));
        
        const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
        
        // Corrected this part to use the string value of currentUser as the key to remove
        if (currentUser) {
            const savedHabitsKey = `SavedHabits_${currentUser}`;
            localStorage.removeItem("CurrentUser");
            localStorage.removeItem(savedHabitsKey);
        }
    };
    

    return (
        <>
            <Navbar />
            <div className='h-screen w-screen flex items-center justify-center bg-black'>
                <div className='flex w-[95vw] h-[90vh] justify-center items-start flex-wrap gap-8 p-4 rounded-lg bg-gray-900 shadow-lg overflow-y-auto'>
                    {
                        account && account.length ?
                            account.map((account, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col py-4 px-6 w-[300px] h-[200px] bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'
                                >
                                    <h4 className='text-lg font-bold mb-2'>Name: {account.Name}</h4>
                                    <h4 className='text-md mb-2'>Email: {account.Email}</h4>
                                    <h4 className='text-md mb-4'>Password: {account.Password}</h4>
                                    <div className='mt-auto'>
                                        <button
                                            className='py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all duration-200'
                                            onClick={() => deleteAccount(account.Email)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                            : <h2 className='text-2xl text-gray-300'>No accounts available</h2>
                    }
                </div>
            </div>
        </>

    );
};

export default Accounts;
