import React from 'react';
import API from '../api';

export default function AuthModal({ setShowAuthModal, authMode, setAuthMode, loginError, setLoginError, authEmail, setAuthEmail, authPassword, setAuthPassword, authName, setAuthName, setCurrentUser, showToast, postLoginRedirect, setActiveTab }) {
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const { data } = await API.post('/auth/login', { email: authEmail, password: authPassword });
      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setShowAuthModal(false);
      showToast('Successfully logged in!');
      if (postLoginRedirect === 'checkout') {
        setActiveTab('checkout');
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const { data } = await API.post('/auth/register', { name: authName, email: authEmail, password: authPassword });
      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setShowAuthModal(false);
      showToast('Account created successfully!');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
        <button onClick={() => setShowAuthModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">✕</button>
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-slate-900">{authMode === 'login' ? 'Sign In to A2Z Store' : 'Create A2Z Store Account'}</h3>
        </div>

        {loginError && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-bold animate-shake">
            ⚠️ {loginError}
          </div>
        )}

        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <input type="email" required placeholder="e.g. user@gmail.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <input type="password" required placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">Authenticate & Login</button>
            <p className="text-center text-xs text-slate-500 mt-2">Need an account? <button type="button" onClick={() => { setAuthMode('register'); setLoginError(null); }} className="text-amber-600 font-bold hover:underline">Register</button></p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
              <input type="text" required placeholder="Username" value={authName} onChange={e => setAuthName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <input type="email" required placeholder="e.g. user@gmail.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <input type="password" required placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">Register Account</button>
            <p className="text-center text-xs text-slate-500 mt-2">Have an account? <button type="button" onClick={() => { setAuthMode('login'); setLoginError(null); }} className="text-amber-600 font-bold hover:underline">Sign In</button></p>
          </form>
        )}
      </div>
    </div>
  );
}