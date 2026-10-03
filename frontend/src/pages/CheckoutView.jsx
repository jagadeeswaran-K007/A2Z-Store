import React, { useState } from 'react';
import API from '../api';

export default function CheckoutView({ cart, setCart, currentUser, orders, setOrders, setActiveTab, showToast }) {
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash-on-Delivery (CoD)');
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrderData = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        userEmail: currentUser?.email || formData.email,
        date: new Date().toISOString().split('T')[0],
        items: cart,
        total: subtotal,
        shippingInfo: formData,
        paymentMethod: paymentMethod,
        status: 'Processing'
      };

      const { data } = await API.post('/orders', newOrderData);
      setOrders([data, ...orders]);
      setCart([]);
      showToast('Order successfully placed in MongoDB database!');
      setActiveTab('account');
    } catch (err) {
      showToast('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Secure Checkout</h1>
      <form onSubmit={handleOrderSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Shipping Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="text" placeholder="Address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="sm:col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="text" placeholder="City" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="text" placeholder="Postal Code" required value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="text" placeholder="Country" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="sm:col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Payment Option</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`flex items-center space-x-3 p-4 rounded-2xl border cursor-pointer ${paymentMethod === 'Cash-on-Delivery (CoD)' ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'Cash-on-Delivery (CoD)'} onChange={() => setPaymentMethod('Cash-on-Delivery (CoD)')} className="accent-amber-600" />
              <span className="text-sm font-bold text-slate-800">Cash-on-Delivery (CoD)</span>
            </label>
            <label className={`flex items-center space-x-3 p-4 rounded-2xl border cursor-pointer ${paymentMethod === 'Online UPI / Card' ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'Online UPI / Card'} onChange={() => setPaymentMethod('Online UPI / Card')} className="accent-amber-600" />
              <span className="text-sm font-bold text-slate-800">Online UPI / Credit Card</span>
            </label>
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">Place Order (₹{subtotal.toLocaleString('en-IN')})</button>
      </form>
    </div>
  );
}