import React, { createContext, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


const AuthCard = ({ AuthLink, AuthLinkText, AuthButton }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  let audio = new Audio('/btnclick.mp3');
  const navigate = useNavigate(); // Initialize navigate
  function CreateAccount(e) {
    e.preventDefault(); 

    audio.play();

    const newAccount = { Name: name, Email: email, Password: password }; // Correct account structure

    const storedAccounts = JSON.parse(localStorage.getItem("Account")) || [];

    const accountExists = storedAccounts.some(account => account.Email.toLowerCase() === email.toLowerCase());

    if (accountExists) {
      audio.play();
      setEmail("");
      setPassword("");
      setName("")
      alert("Account Already Exists");
    } else {
      if (email && name && password) {
        // Save account to localStorage
        const updatedAccounts = [...storedAccounts, newAccount];
        localStorage.setItem("Account", JSON.stringify(updatedAccounts));

        audio.play(); // Play the music after saving the account
        setEmail("");
        setName("")
        setPassword("");
        alert("Account Created Successfully");
      } else {
        alert("Fill All the Forms");
        let audio = new Audio('/popup.wav');
        audio.play();
      }
    }
  }

  function LogAccount() {
    const Accounts = JSON.parse(localStorage.getItem("Account")) || [];

    const account = Accounts.find(account => account.Email.toLowerCase() === email.toLowerCase());

    if (account && account.Password === password) {
      audio.play();
      navigate('/MainDashboard');
      localStorage.setItem("CurrentUser",JSON.stringify(name))
    } else {
      audio.play();
      alert("Invalid email or password");
      setEmail("");
      setPassword("");
      setName("")
    }
  }

  return (
 
      <div className='w-screen h-screen bg-black flex flex-col items-center justify-center py-4'>
        {/* Main title card */}
        <div className='w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]  h-[30%] flex items-center justify-center py-4'>
          <h1 className=' Logo text-2xl sm:text-3xl md:text-4xl font-bold text-white shadow-3d'>
            Habit Tracker
          </h1>
        </div>

        {/* Form card */}
        {AuthButton === "Login" ? (
          <div className='w-[90%] sm:w-[70%] md:w-[40%] lg:w-[34%] h-[80%] flex flex-col items-center justify-center border-[1px] border-white rounded-xl gap-8 py-6'>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />
            <input required type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />
            <input required type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />

            <div className='w-[80%] sm:w-[90%] flex flex-col sm:flex-row items-center justify-between gap-4'>
              <button onClick={LogAccount} className='w-full sm:w-auto p-3 px-4 sm:px-8 bg-white font-semibold rounded-md text-black'>
                {AuthButton}
              </button>
              <Link to={AuthLink} className='text-white mt-4 sm:mt-0'>{AuthLinkText}</Link>
            </div>
          </div>
        ) : (
          <div className='w-[90%] sm:w-[70%] md:w-[40%] lg:w-[34%] h-[80%] flex flex-col items-center justify-center border-[1px] border-white rounded-xl gap-8 py-6'>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />
            <input required value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Password' className='w-[80%] sm:w-[90%] h-[10%] px-2 outline-none bg-transparent border-[2px] border-white py-4' />

            <div className='w-[80%] sm:w-[90%] flex flex-col sm:flex-row items-center justify-between gap-4'>
              <button onClick={CreateAccount} className='w-full sm:w-auto p-3 px-4 sm:px-8 bg-white font-semibold rounded-md text-black'>
                {AuthButton}
              </button>
              <Link to={AuthLink} className='text-white mt-4 sm:mt-0'>{AuthLinkText}</Link>
            </div>
          </div>
        )}
      </div>
    

  );
};

export default AuthCard;
