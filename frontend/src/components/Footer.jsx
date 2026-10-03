import React from 'react';

export default function Footer({ setActiveTab, setSelectedCategory }) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-black tracking-tight mb-4">A2Z Store</h3>
          <p className="text-slate-400 text-sm font-light">MERN stack e-commerce web app featuring MongoDB models and INR currency standards (₹).</p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><button onClick={() => setActiveTab('home')}>Home</button></li>
            <li><button onClick={() => setActiveTab('products')}>Products</button></li>
            <li><button onClick={() => setActiveTab('cart')}>Cart</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><button onClick={() => { setSelectedCategory('Electronics'); setActiveTab('products'); }}>Electronics</button></li>
            <li><button onClick={() => { setSelectedCategory('Kitchen'); setActiveTab('products'); }}>Kitchen</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Backend Status</h4>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MongoDB Atlas Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}