import React, { useState, useEffect } from 'react';
import API from './api';

// Components & Views
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import HomeView from './pages/HomeView';
import ProductsView from './pages/ProductsView';
import ProductDetailView from './pages/ProductDetailView';
import CartView from './pages/CartView';
import CheckoutView from './pages/CheckoutView';
import AccountView from './pages/AccountView';
import AdminView from './pages/AdminView';

export default function App() {

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activeTab, setActiveTab] = useState('home');
  //const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loginError, setLoginError] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(100000);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Fetch initial data from Backend API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await API.get('/products');
        setProducts(prodRes.data);

        const orderRes = await API.get('/orders');
        setOrders(orderRes.data);

        const userRes = await API.get('/users');
        setUsers(userRes.data);
      } catch (err) {
        console.error('Error fetching initial data from backend:', err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    showToast('Logged out successfully.');
    setActiveTab('home');
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        handleLogout={handleLogout}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
        setLoginError={setLoginError}
        setPostLoginRedirect={setPostLoginRedirect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
      />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            products={products}
            setSelectedProductId={setSelectedProductId}
            addToCart={addToCart}
            setSelectedCategory={setSelectedCategory}
            cart={cart}
          />
        )}
        {activeTab === 'products' && (
          <ProductsView
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setSelectedProductId={setSelectedProductId}
            setActiveTab={setActiveTab}
            addToCart={addToCart}
          />
        )}
        {activeTab === 'product-detail' && (
          <ProductDetailView
            productId={selectedProductId}
            products={products}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'cart' && (
          <CartView
            cart={cart}
            setCart={setCart}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
            setLoginError={setLoginError}
            setPostLoginRedirect={setPostLoginRedirect}
            showToast={showToast}
          />
        )}
        {activeTab === 'checkout' && (
          <CheckoutView
            cart={cart}
            setCart={setCart}
            currentUser={currentUser}
            orders={orders}
            setOrders={setOrders}
            setActiveTab={setActiveTab}
            showToast={showToast}
          />
        )}
        {activeTab === 'account' && (
          <AccountView
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            orders={orders}
            showToast={showToast}
          />
        )}
        {activeTab === 'admin' && currentUser?.role === 'admin' && (
          <AdminView
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            users={users}
            setUsers={setUsers}
            showToast={showToast}
          />
        )}
      </main>

      {showAuthModal && (
        <AuthModal
          setShowAuthModal={setShowAuthModal}
          authMode={authMode}
          setAuthMode={setAuthMode}
          loginError={loginError}
          setLoginError={setLoginError}
          authEmail={authEmail}
          setAuthEmail={setAuthEmail}
          authPassword={authPassword}
          setAuthPassword={setAuthPassword}
          authName={authName}
          setAuthName={setAuthName}
          setCurrentUser={setCurrentUser}
          showToast={showToast}
          postLoginRedirect={postLoginRedirect}
          setActiveTab={setActiveTab}
        />
      )}

      <Toast message={toastMessage} />
      <Footer setActiveTab={setActiveTab} setSelectedCategory={setSelectedCategory} />
    </div>
  );
}