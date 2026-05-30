import React, { useState, useRef, useEffect, use } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../features/auth/hook/useAuth.js';

function Logo() {
  return (
    <svg width="300" viewBox="0 0 520 120" className="block">
      <rect x="0" y="10" width="100" height="100" rx="22" fill="#1a3a2a"/>

      <path d="M28 72 Q50 30 72 72" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M38 58 L62 58" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="72" cy="72" r="5" fill="#ffffff"/>

      <text
        x="118"
        y="58%"
        dominantBaseline="middle"
        fontFamily="Mozilla Headline, 'Times New Roman', serif"
        fontSize="100"

        fontWeight="700"
        fill="#1a3a2a"
      >
        Assistly
      </text>
    </svg>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  console.log(isLoggedIn)

  const {user , loading} = useSelector(state => state.auth)
  

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const privateLinks = [
     {label : "Home", to : "/"},
    { label: 'Dashboard', to: '/dashboard' },
    {label : "Docs", to : "/docs"},
    {label : "Embed Code", to : "/embed" }
    
   
  ];

  const publicLinks = [
    {label : "Home", to : "/"},
    { label: 'Features', to: '/features' },
    { label: 'Contact', to: '/contact' },
    {label :"See Demo"  , to : "/demo"}, 
     {label : "Docs", to : "/docs"},
    
    
  ];

  const {handleLogoutUser} = useAuth()

 


  const navLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav className="w-full bg-[#f5f0e8] border-b border-[#1a3a2a]/10 px-6 md:px-12 py-2 flex items-center justify-between relative z-50">

      {/* LEFT: Logo */}
      <div className="flex items-center">
        <Link to="/"><Logo /></Link>
      </div>

      {/* CENTER: Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-4 -ml-20 ">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-[#1a3a2a] text-sm font-medium hover:opacity-60 transition-opacity duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* RIGHT: Auth Buttons or Avatar Dropdown */}
      <div className="hidden md:flex items-center gap-3">

        {isLoggedIn ? (
          /* Avatar Dropdown */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              {/* Avatar Circle */}
              <div className="w-9 h-9 rounded-full bg-[#1a3a2a] flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
               <img src={user?.avatar} alt=""  />
              </div>
              {/* Chevron */}
              <svg
                className={`w-4 h-4 text-[#1a3a2a] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-[#1a3a2a]/10 py-1 overflow-hidden">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1a3a2a] hover:bg-[#f5f0e8] transition"
                >
                  👤 Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1a3a2a] hover:bg-[#f5f0e8] transition"
                >
                  ⚙️ Settings
                </Link>
                <div className="border-t border-[#1a3a2a]/10 my-1" />
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    
                      handleLogoutUser(user.accessToken);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login + Get Started */
          <>
            
            <Link
              to="/login"
              className="bg-[#1a3a2a] text-white text-sm font-medium px-5 py-2 rounded-md hover:opacity-85 transition-all duration-200"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* MOBILE: Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-[#1a3a2a] p-2"
      >
        {mobileOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* MOBILE: Dropdown Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#f5f0e8] border-t border-[#1a3a2a]/10 flex flex-col py-4 md:hidden shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="px-8 py-3 text-[#1a3a2a] text-sm font-medium hover:bg-[#1a3a2a]/5 transition"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-[#1a3a2a]/10 mt-3 pt-3 px-8 flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                className="w-full text-red-600 text-sm font-medium border border-red-200 py-2.5 rounded-md hover:bg-red-50 transition"
                onClick={() => {
                    handleLogoutUser(user.accessToken)
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center text-[#1a3a2a] text-sm font-medium border border-[#1a3a2a] py-2.5 rounded-md hover:bg-[#1a3a2a] hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-[#1a3a2a] text-white text-sm font-medium py-2.5 rounded-md hover:opacity-85 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;