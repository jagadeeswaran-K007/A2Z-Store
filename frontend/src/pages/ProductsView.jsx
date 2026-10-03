import React from 'react';

export default function ProductsView({ products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, priceFilter, setPriceFilter, sortBy, setSortBy, viewMode, setViewMode, setSelectedProductId, setActiveTab, addToCart }) {
  const categories = ['All', 'Electronics', 'Audio', 'Furniture', 'Kitchen', 'Fashion', 'Gaming'];
  const availableProducts = products.filter(p => p.stock > 0);

  const filtered = availableProducts.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceFilter;
    return matchesCat && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Search Inventory</h3>
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">6 Categories</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${selectedCategory === cat ? 'bg-amber-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}>{cat}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Max Price: ₹{priceFilter.toLocaleString('en-IN')}</h3>
            <input type="range" min="1000" max="200000" step="1000" value={priceFilter} onChange={e => setPriceFilter(Number(e.target.value))} className="w-full accent-amber-600" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-sm font-bold text-slate-700">Showing {filtered.length} products</span>
            <div className="flex items-center space-x-4">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none">
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(product => (
              <div key={product._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition p-5 flex flex-col justify-between">
                <div>
                  {/* Requirement 3: Detailed Product Card with image click */}
                  <div className="h-48 bg-slate-100 rounded-2xl overflow-hidden relative mb-4 cursor-pointer" onClick={() => { setSelectedProductId(product._id); setActiveTab('product-detail'); }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                    <span className="absolute top-2 left-2 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold uppercase text-slate-800">{product.category}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-600 uppercase">{product.category}</span>
                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                      <span>★</span><span>{product.rating}</span>
                    </div>
                  </div>
                  <h4 onClick={() => { setSelectedProductId(product._id); setActiveTab('product-detail'); }} className="font-bold text-slate-900 text-sm cursor-pointer hover:text-amber-600 line-clamp-1">{product.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                  <div className="text-lg font-black text-slate-900 mt-3">₹{product.price?.toLocaleString('en-IN')}</div>
                </div>
                <button onClick={() => addToCart(product)} className="mt-5 w-full py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700 shadow">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}