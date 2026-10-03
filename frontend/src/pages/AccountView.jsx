import React, { useState } from 'react';
import API from '../api';// Adjust the relative path to your api.js file if needed

export default function AccountView({ currentUser, setCurrentUser, orders, showToast }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const userOrders = orders.filter(o => o.userEmail === currentUser?.email || o.shippingInfo?.email === currentUser?.email);

// Inside your AccountView component:
const handleUpdateProfile = async (e) => {
  e.preventDefault();
  
  try {
    // Send the update to your backend API
    const { data } = await API.put('/auth/profile', {
      userId: currentUser._id,
      name: name // Assuming 'name' is the state variable holding the input value
    });

    // Update parent/local user state with the fresh data returned from MongoDB
    setCurrentUser(data.user);
    setIsEditing(false);
    showToast('Profile updated in MongoDB! Order history retained.');
  } catch (err) {
    console.error('Failed to update profile in DB:', err.response?.data?.message || err.message);
    showToast('Error updating profile in database.');
  }
};

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-2xl">{currentUser?.name?.charAt(0) || 'U'}</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">{currentUser?.name}</h1>
            <p className="text-slate-500 text-sm">{currentUser?.email} &bull; <span className="text-amber-600 font-bold uppercase">{currentUser?.role}</span></p>
          </div>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-xl text-xs text-slate-700 transition">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase">Update Your Profile</h3>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
          </div>
          <button type="submit" className="py-3 px-6 bg-amber-600 text-white font-bold rounded-xl text-sm shadow transition-all duration-300 transform hover:scale-105">Save Changes</button>
        </form>
      )}

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900">Your Order History & Live Statuses</h3>
        {userOrders.length === 0 ? (
          <p className="text-slate-500 text-sm">No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="font-bold text-sm text-slate-900">{order.id} &bull; <span className="text-amber-700">{order.paymentMethod}</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">Date: {order.date} &bull; {order.items.length} items</div>
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between">
                  <div className="font-black text-slate-900">₹{order.total?.toLocaleString('en-IN')}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    order.status === 'Shipped' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}