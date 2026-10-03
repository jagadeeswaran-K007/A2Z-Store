import React, { useState } from 'react';

export default function ProductDetailView({ productId, products, addToCart, setActiveTab }) {
  const [qty, setQty] = useState(1);
  const product = products.find(p => p._id === productId) || products[0];

  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-amber-600 hover:underline">← Back to Products</button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="h-96 bg-slate-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase">{product.category}</span>
            <div className="flex items-center space-x-1 text-amber-500 text-sm font-bold">
              <span>★</span><span>{product.rating} / 5.0</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
          <div className="text-3xl font-black text-slate-900">₹{product.price?.toLocaleString('en-IN')}</div>
          <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          
          {/* Stock Status Badge Indicator */}
          <div>
            {product.stock > 0 ? (
              <span className="inline-flex items-center text-emerald-700 bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                In Stock ({product.stock} units available)
              </span>
            ) : (
              <span className="inline-flex items-center text-rose-700 bg-rose-50 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200">
                <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                Out of Stock
              </span>
            )}
          </div>
          
          {/* Requirement 4: Detailed Specifications */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">MongoDB Specifications</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-slate-500">Brand:</span> <strong className="text-slate-800">{product.specifications?.brand}</strong></div>
              <div><span className="text-slate-500">Warranty:</span> <strong className="text-slate-800">{product.specifications?.warranty}</strong></div>
              <div><span className="text-slate-500">Origin:</span> <strong className="text-slate-800">{product.specifications?.origin}</strong></div>
              <div><span className="text-slate-500">Stock Available:</span> <strong className="text-amber-600">{product.stock} units</strong></div>
            </div>
          </div>

          {!isOutOfStock && (
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border border-slate-200 rounded-xl">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))} 
                  className="px-3.5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-l-xl"
                >
                  -
                </button>
                <span className="px-5 py-2.5 font-bold text-sm">{qty}</span>
                <button 
                  onClick={() => setQty(Math.min(product.stock, qty + 1))} 
                  className="px-3.5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-r-xl"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => addToCart(product, qty)} 
                className="flex-1 py-3.5 bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-amber-700"
              >
                Add {qty} to Cart
              </button>
            </div>
          )}

          {isOutOfStock && (
            <button 
              disabled 
              className="w-full py-3.5 bg-slate-200 text-slate-400 font-bold rounded-xl cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}