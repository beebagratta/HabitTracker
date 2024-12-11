import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const nextPageSound=new Audio("nextpage1.mp3")
  
  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function Logout() {
    navigate('/'); // Redirect to home on logout
    nextPageSound.play()
  }

  return (
    <div className='w-[80%] mx-auto h-[10vh] flex items-center justify-between text-white'>
      {/* Logo or Branding */}
      <div className='text-lg font-bold'>MyApp</div>

      {/* Navbar Links */}
      <nav
        className={`flex gap-3 ${
          isMobileMenuOpen
            ? 'flex-col absolute top-[10vh] left-0 bg-black w-full py-5 px-4'
            : 'hidden sm:flex'
        }`}
      >
        <Link onClick={()=>nextPageSound.play()} to="/MainDashboard" className='py-2'>Home</Link>
        <Link onClick={()=>nextPageSound.play()}to="/CreateHabit" className='py-2'>Create</Link>
        <Link  onClick={()=>nextPageSound.play()} to="/accounts" className='py-2'>Accounts</Link>
      </nav>

      {/* Logout Button */}
      <button
        className='bg-white text-black py-2 px-6 font-bold rounded-lg'
        onClick={Logout}
      >
        Logout
      </button>

      {/* Mobile Hamburger Icon */}
      <div className='sm:hidden '>
        <button onClick={toggleMobileMenu} className='text-white'>
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
