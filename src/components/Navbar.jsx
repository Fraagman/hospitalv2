import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, LogOut, Check, X, ShieldCheck, Menu } from 'lucide-react';

export default function Navbar() {
  const { user, profile, loginWithGoogle, mockLogin, logout, updateProfile } = useAuth();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    if (profile) {
      setEditName(profile.name || '');
      setEditPhone(profile.phone || '');
    }
  }, [profile]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    if (editPhone && editPhone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    setPhoneError('');
    updateProfile(editName.trim(), editPhone);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      setIsProfileOpen(false);
    }, 1200);
  };

  const handleLogin = async () => {
    try {
      if (import.meta.env.DEV) {
        mockLogin({
          uid: 'mock-123',
          displayName: 'Jane Doe (Demo)',
          email: 'jane.doe@example.com',
          photoURL: ''
        });
      } else {
        await loginWithGoogle();
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <nav className="navbar fade-in-up visible">
        <div className="nav-logo-wrapper">
          <Link to="/" className="logo text-[#1A1A1A] hover:opacity-80 transition-opacity">
            Shaureen
          </Link>
        </div>
        <div className="nav-spacer"></div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li><a href="#services">Services</a></li>
          <li><a href="#why-us">About</a></li>
          <li><a href="#site-footer">Contact</a></li>
        </ul>
        <div className="nav-icons flex items-center gap-4">
          {/* Profile Section */}
          {user ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#3770bf] hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0 cursor-pointer shadow-sm shadow-[#3770bf]/20"
              aria-label="Profile"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#3770bf] text-white flex items-center justify-center font-bold text-sm">
                  {editName ? editName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#3770bf]/20 text-[#3770bf] hover:border-[#3770bf] hover:bg-[#3770bf]/5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <User size={14} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Call to Action Button - hidden on mobile, available in hamburger menu */}
          <Link to="/book-appointment" className="contact-btn text-xs sm:text-sm whitespace-nowrap hide-on-mobile">
            Book Appointment
          </Link>

          {/* Hamburger Button - visible on mobile/tablet only */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <ul className="mobile-nav-links">
                <li>
                  <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                </li>
                <li>
                  <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                </li>
                <li>
                  <a href="#site-footer" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                </li>
              </ul>
              <div className="mobile-menu-cta">
                <Link
                  to="/book-appointment"
                  className="mobile-book-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && user && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-[0_25px_60px_-15px_rgba(55,112,191,0.25)] relative z-10 overflow-hidden border border-slate-200/60"
              style={{ padding: '28px' }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Philosopher', sans-serif" }}>
                    My Account Profile
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{user.email}</p>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-slate-100/55"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="flex flex-col gap-5 mt-2">
                {/* Patient Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-[#3770bf]/90 uppercase tracking-widest">
                    Patient Name
                  </label>
                  <div 
                    className="flex items-center gap-3 w-full h-12 rounded-xl bg-[#f3f6ff] border border-gray-200 focus-within:border-[#3770bf] focus-within:ring-4 focus-within:ring-[#3770bf]/8 transition-all duration-200"
                    style={{ paddingLeft: '16px', paddingRight: '16px' }}
                  >
                    <User size={18} className="text-[#8dc2ff] flex-shrink-0" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter name"
                      required
                      className="w-full h-full bg-transparent border-0 outline-none text-gray-800 text-sm font-semibold placeholder-gray-400 p-0 focus:ring-0"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-extrabold text-[#3770bf]/90 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <div 
                    className={`flex items-center gap-3 w-full h-12 rounded-xl bg-[#f3f6ff] border transition-all duration-200 focus-within:ring-4 ${
                      phoneError
                        ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100/60'
                        : 'border-gray-200 focus-within:border-[#3770bf] focus-within:ring-[#3770bf]/8'
                    }`}
                    style={{ paddingLeft: '16px', paddingRight: '16px' }}
                  >
                    <Phone size={18} className="text-[#8dc2ff] flex-shrink-0" />
                    <div className="flex items-center pr-3 border-r border-gray-300 h-5 flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-500 select-none">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => {
                        setEditPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setPhoneError('');
                      }}
                      placeholder="Enter 10-digit number"
                      className="w-full h-full bg-transparent border-0 outline-none text-gray-800 text-sm font-semibold placeholder-gray-400 p-0 focus:ring-0"
                    />
                  </div>
                  {phoneError ? (
                    <p className="text-xs text-red-500 font-medium">{phoneError}</p>
                  ) : (
                    <p className="text-[11px] text-gray-400 leading-tight">Saves details to skip inputs during appointment bookings.</p>
                  )}
                </div>

                {/* Footer Save Banner/Toast */}
                <div className="pt-2">
                  <AnimatePresence>
                    {showSavedToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center justify-center gap-2 text-xs font-bold text-green-600 bg-green-50 py-3 rounded-xl mb-3 border border-green-200"
                      >
                        <Check size={16} />
                        Profile Saved Successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#cef26d] text-[#3770bf] font-bold text-sm shadow-md shadow-[#cef26d]/20 hover:shadow-lg hover:shadow-[#cef26d]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Save Details
                  </button>
                </div>
              </form>

              {/* Sign out */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#3770bf]" />
                  Secure Data
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50/80 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
