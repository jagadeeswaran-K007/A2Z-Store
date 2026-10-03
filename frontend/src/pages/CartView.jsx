import React from 'react';

export default function CartView({ cart, setCart, setActiveTab, currentUser, setShowAuthModal, setAuthMode, setLoginError, setPostLoginRedirect, showToast }) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleUpdateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
    showToast('Cart updated');
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
    showToast('Item removed from cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Shopping Cart Details</h1>
      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4 shadow-sm">
          <p className="text-slate-500 text-sm">Your cart is currently empty.</p>
          <button onClick={() => setActiveTab('products')} className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl text-sm transition-all duration-300 transform hover:scale-105">Start Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item._id} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <div className="text-xs text-slate-500 mt-1">₹{item.price?.toLocaleString('en-IN')} each</div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                  {/* Requirement 5: Increase/Decrease quantity */}
                  <div className="flex items-center border border-slate-200 rounded-xl">
                    <button onClick={() => handleUpdateQty(item._id, -1)} className="px-3 py-1.5 text-slate-600 font-bold">-</button>
                    <span className="px-3 py-1.5 font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item._id, 1)} className="px-3 py-1.5 text-slate-600 font-bold">+</button>
                  </div>
                  <div className="font-black text-slate-900 text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  {/* Requirement 5: Remove product button */}
                  <button onClick={() => handleRemoveItem(item._id)} className="text-rose-500 hover:text-rose-700 font-bold text-xs p-2">✕ Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 h-fit space-y-6 shadow-sm">
            <h3 className="font-black text-lg text-slate-900">Order Summary</h3>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Shipping (CoD Available)</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between text-base font-black text-slate-900">
              <span>Total Amount</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <button onClick={() => {
              if (!currentUser) {
                setAuthMode('login');
                setLoginError('Please sign in to proceed with secure checkout.');
                setPostLoginRedirect('checkout');
                setShowAuthModal(true);
              } else {
                setActiveTab('checkout');
              }
            }} className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">Proceed to Secure Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}