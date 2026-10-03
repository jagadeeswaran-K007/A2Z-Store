import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab, currentUser, handleLogout, setShowAuthModal, setAuthMode, setLoginError, setPostLoginRedirect, searchQuery, setSearchQuery, cart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs py-2 px-4 text-center font-medium tracking-wide shadow-inner">
        <span>🚀 Free Express Shipping on Orders Over ₹3,500! &bull; Use code <strong className="underline">SAVE10</strong></span>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-8">
            <button onClick={() => setActiveTab('home')} className="flex items-center space-x-3 text-left group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md transition-all duration-300 transform group-hover:scale-110">AZ</div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">A2Z Store</span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">E-COM &bull; Web App</span>
              </div>
            </button>

            <nav className="hidden md:flex items-center space-x-1">
              <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === 'home' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>Home</button>
              <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === 'products' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>Products</button>
              {currentUser?.role === 'admin' && (
                <button onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === 'admin' ? 'bg-amber-50 text-amber-600 font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>Admin Dashboard 🛡️</button>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={() => setActiveTab('cart')} className="relative p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
            </button>

            {currentUser ? (
              <div className="hidden sm:flex items-center space-x-4">
                <button onClick={() => setActiveTab('account')} className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 text-sm font-medium transition-all duration-300 hover:scale-105">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">{currentUser.name.charAt(0)}</div>
                  <span className="font-semibold">{currentUser.name.split(' ')[0]}</span>
                </button>
                {/* Requirement 2: Text Logout Button */}
                <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all duration-300 transform hover:scale-105 active:scale-95">Logout</button>
              </div>
            ) : (
              <button onClick={() => { setAuthMode('login'); setLoginError(null); setPostLoginRedirect(null); setShowAuthModal(true); }} className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95">Sign In</button>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-50 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600">Home</button>
            <button onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600">Products</button>
            {currentUser?.role === 'admin' && (
              <button onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600">Admin Dashboard 🛡️</button>
            )}
            {currentUser ? (
              <>
                <button onClick={() => { setActiveTab('account'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50">My Account ({currentUser.name})</button>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50">Logout</button>
              </>
            ) : (
              <button onClick={() => { setAuthMode('login'); setLoginError(null); setPostLoginRedirect(null); setShowAuthModal(true); setMobileMenuOpen(false); }} className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl text-sm text-center shadow">Sign In</button>
            )}
          </div>
        )}
      </header>
    </>
  );
}