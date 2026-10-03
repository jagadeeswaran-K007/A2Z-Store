import React, { useState } from 'react';
import API from '../api';

export default function AdminView({ products, setProducts, orders, setOrders, users, setUsers, showToast }) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Tracks product being edited

  // Add product form states
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newStock, setNewStock] = useState('0');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const newProdData = {
        name: newName,
        price: Number(newPrice),
        category: newCategory,
        stock: Number(newStock),
        rating: 4.5,
        reviewsCount: 1,
        image: newImage || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        description: newDesc,
        specifications: { brand: 'ApexBrand', warranty: '1 Year', origin: 'India' }
      };

      const { data } = await API.post('/products', newProdData);
      setProducts([data, ...products]);
      showToast('New product added to MongoDB successfully!');
      setShowAddProductModal(false);
      setNewName('');
      setNewPrice('');
      setNewStock('20');
      setNewImage('');
      setNewDesc('');
    } catch (err) {
      showToast('Failed to add product to database.');
    }
  };

  const handleSaveEditProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/products/${editingProduct._id}`, {
        name: editingProduct.name,
        price: Number(editingProduct.price),
        category: editingProduct.category,
        stock: Number(editingProduct.stock),
        description: editingProduct.description,
        image: editingProduct.image
      });

      setProducts(products.map(p => p._id === data._id ? data : p));
      showToast('Product updated successfully in MongoDB!');
      setEditingProduct(null); // Close modal
    } catch (err) {
      showToast('Failed to update product details.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      showToast('Product removed from database.');
    } catch (err) {
      showToast('Failed to delete product.');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order status updated to ${newStatus}!`);
    } catch (err) {
      showToast('Failed to update order status.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await API.delete(`/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
      showToast('User deleted from database.');
    } catch (err) {
      showToast('Failed to delete user.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard 🛡️️</h1>
        <button onClick={() => setShowAddProductModal(!showAddProductModal)} className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl text-sm shadow transition-all duration-300 transform hover:scale-105">
          {showAddProductModal ? 'Close Form' : '+ Add New Product'}
        </button>
      </div>

      {showAddProductModal && (
        <div className="bg-white p-8 rounded-3xl border border-amber-300 shadow-xl space-y-6 animate-in fade-in duration-200">
          <h3 className="text-lg font-black text-slate-900">Add New Product to MongoDB Compass</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" required value={newName} onChange={e => setNewName(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="number" placeholder="Price (₹)" required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <input type="number" placeholder="Stock Quantity" required value={newStock} onChange={e => setNewStock(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none">
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Furniture">Furniture</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Fashion">Fashion</option>
              <option value="Gaming">Gaming</option>
            </select>
            <input type="url" placeholder="Image URL (e.g. Unsplash link)" required value={newImage} onChange={e => setNewImage(e.target.value)} className="sm:col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <textarea placeholder="Description & Specifications" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="sm:col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500" />
            <button type="submit" className="sm:col-span-2 py-4 bg-amber-600 text-white font-bold rounded-xl text-sm shadow transition-all duration-300 transform hover:scale-105">Save Product</button>
          </form>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative space-y-6">
            <button onClick={() => setEditingProduct(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold">✕</button>
            <h3 className="text-xl font-black text-slate-900">Edit Product Full Info</h3>
            <form onSubmit={handleSaveEditProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Name</label>
                <input type="text" required value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Price (₹)</label>
                  <input type="number" required value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stock</label>
                  <input type="number" required value={editingProduct.stock} onChange={e => setEditingProduct({...editingProduct, stock: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <input type="text" required value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
                <input type="url" required value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea rows="3" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={() => setEditingProduct(null)} className="w-1/2 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm">Cancel</button>
                <button type="submit" className="w-1/2 py-3 bg-amber-600 text-white font-bold rounded-xl text-sm shadow hover:bg-amber-700">Update in DB</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Customer Orders */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-slate-900">Manage Customer Orders & Live Statuses</h3>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="font-bold text-sm text-slate-900">{order.id} &bull; <span className="text-amber-700">{order.userEmail}</span></div>
                <div className="text-xs text-slate-500 mt-0.5">{order.date} &bull; Total: ₹{order.total?.toLocaleString('en-IN')} &bull; {order.paymentMethod}</div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select value={order.status} onChange={e => handleUpdateOrderStatus(order.id, e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-amber-700 focus:outline-none">
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product & Full Information Management */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-slate-900">Manage Inventory Stocks & Full Details</h3>
        <div className="space-y-4">
          {products.map(prod => (
            <div key={prod._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-xl border" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{prod.name}</h4>
                  <div className="text-xs text-slate-500">₹{prod.price?.toLocaleString('en-IN')} &bull; {prod.category} &bull; Stock: <span className="font-bold text-amber-700">{prod.stock}</span></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button onClick={() => setEditingProduct(prod)} className="px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-xl text-xs hover:bg-amber-100 transition">Edit Full Info</button>
                <button onClick={() => handleDeleteProduct(prod._id)} className="px-4 py-2 bg-rose-50 text-rose-600 font-bold rounded-xl text-xs hover:bg-rose-100 transition">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-slate-900">Manage Users</h3>
        <div className="space-y-3">
          {users.map(u => (
            <div key={u._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-sm text-slate-900">{u.name} <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase ml-2">{u.role}</span></div>
                <div className="text-xs text-slate-500">{u.email}</div>
              </div>
              {u.role !== 'admin' && (
                <button onClick={() => handleDeleteUser(u._id)} className="px-4 py-2 bg-rose-50 text-rose-600 font-bold rounded-xl text-xs hover:bg-rose-100 transition">Delete User</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}