import React from 'react';

export default function HomeView({ setActiveTab, products, setSelectedProductId, addToCart, setSelectedCategory, cart }) {
  const availableProducts = products.filter(p => p.stock > 0);
  const categoriesList = ['Electronics', 'Audio', 'Furniture', 'Kitchen', 'Fashion', 'Gaming'];

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="space-y-16 pb-20">
      {/* Requirement 8: Shopping Mall Hero with dull overlay background */}
      <div className="relative bg-slate-900 text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555529771-835f59fc5efe')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>

        <div className="max-w-7xl mx-auto relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-widest">MongoDB Powered Store</span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">Discover Premium Collections at Apex Mall</h1>
            <p className="text-slate-300 text-base font-light">Explore state-of-the-art products across 6 specialized categories with Indian Rupee (₹) pricing and instant Cash-on-Delivery.</p>
            <div className="flex space-x-4 pt-2">
              <button onClick={() => setActiveTab('products')} className="px-8 py-4 bg-amber-600 text-white font-black rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">Explore Products</button>
              <button onClick={() => { setSelectedCategory('Electronics'); setActiveTab('products'); }} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-white/20">View Categories</button>
            </div>
          </div>
        </div>
      </div>

      {/* Requirement 1: Category Bars before Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-slate-500 text-sm">Click any category to instantly view associated MongoDB inventory</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categoriesList.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setActiveTab('products'); }} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-md transition-all duration-300 transform hover:scale-105 text-center group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xl group-hover:bg-amber-600 group-hover:text-white transition">🛍️</div>
              <span className="font-bold text-sm text-slate-800">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Products</h2>
            <p className="text-slate-500 text-sm">Top rated selections across departments</p>
          </div>
          <button onClick={() => setActiveTab('products')} className="text-amber-600 font-bold text-sm hover:underline">See All Products →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {availableProducts.slice(0, 4).map(product => (
            <div key={product._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden group">
              <div className="h-48 bg-slate-100 relative overflow-hidden cursor-pointer" onClick={() => { setSelectedProductId(product._id); setActiveTab('product-detail'); }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold uppercase text-slate-800">{product.category}</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 text-xs mb-1">
                    <span>★</span>
                    <span className="font-bold text-slate-700">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount})</span>
                  </div>
                  <h3 onClick={() => { setSelectedProductId(product._id); setActiveTab('product-detail'); }} className="font-bold text-slate-900 text-sm cursor-pointer hover:text-amber-600 line-clamp-1">{product.name}</h3>
                  <div className="text-lg font-black text-slate-900 mt-2">₹{product.price?.toLocaleString('en-IN')}</div>
                </div>
                <button onClick={() => addToCart(product)} className="mt-4 w-full py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700 shadow">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirement 1: Cart Info Last in Home (After Featured Products, before Footer) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-2xl shadow">🛒</div>
            <div>
              <h3 className="font-black text-slate-900 text-lg">Your Shopping Cart Overview</h3>
              <p className="text-xs text-slate-600">You currently have <strong className="text-amber-700">{cart.reduce((s, i) => s + i.quantity, 0)} items</strong> stored in your cart session.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between">
            <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Cart Subtotal</span>
              <span className="text-xl font-black text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <button onClick={() => setActiveTab('cart')} className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700">View Cart Details</button>
          </div>
        </div>
      </div>
      {/* App Info Features Placed Directly Below Cart Information */}
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
          <div className="text-indigo-600 text-2xl mb-2">🚚</div>
          <h4 className="font-bold text-gray-800">Express Global Delivery</h4>
          <p className="text-sm text-gray-500 mt-1">Free shipping on orders over $50 with real-time tracking.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
          <div className="text-indigo-600 text-2xl mb-2">🛡️</div>
          <h4 className="font-bold text-gray-800">Secure MERN Payments</h4>
          <p className="text-sm text-gray-500 mt-1">Encrypted transactions via simulated Stripe/PayPal gateway.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
          <div className="text-indigo-600 text-2xl mb-2">🔄</div>
          <h4 className="font-bold text-gray-800">30-Day Money Back</h4>
          <p className="text-sm text-gray-500 mt-1">Hassle-free returns and dedicated customer support.</p>
        </div>
      </div>
    </div>
  );
}