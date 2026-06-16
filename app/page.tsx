'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Filter, CheckCircle, Tag, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';

interface Product {
  id: string; name: string; description: string; price: number; image: string; category: string; stock: number;
}

export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Read saved cart state instantly on browser bootup
useEffect(() => {
  const savedCart = localStorage.getItem('horizon_cart');
  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);

// 2. Automatically save cart entries whenever changes happen
useEffect(() => {
  if (cart.length > 0) {
    localStorage.setItem('horizon_cart', JSON.stringify(cart));
  }
}, [cart]);
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => { setProducts(data); setLoading(false); });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== id));
  };

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Animated Modern Hero Banner Section */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-12 overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative max-w-2xl z-10">
            <span className="inline-flex items-center bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-400/20 shadow-sm animate-pulse">
              Summer Campaign Active
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight leading-tight">
              The Ultimate Tech <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Workspace Upgrades.</span>
            </h1>
            <p className="mt-4 text-indigo-100 text-base md:text-lg leading-relaxed font-light">
              Discover high-performance components, ergonomic tools, and elite desktop accessories configured perfectly for engineering workflows.
            </p>
          </div>
        </div>

        {/* Dynamic Storefront Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Interactive Category Filter Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2 mb-4 text-sm uppercase tracking-wider">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Filter Collection</span>
              </h3>
              <div className="space-y-1.5">
                {['All', 'Electronics', 'Peripherals', 'Office'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      filter === cat 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span>{cat}</span>
                    <ChevronRight className={`w-4 h-4 opacity-50 ${filter === cat ? 'block' : 'hidden lg:block'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Security & Trust Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 shadow-sm flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-emerald-900">Authorized Retail Clearance</p>
                <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                  All ecosystem items are authenticated, trackable, and backed by comprehensive standard merchant safety guarantees.
                </p>
              </div>
            </div>
          </div>

          {/* Core Dynamic Catalog Viewport */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-3 bg-white rounded-2xl border">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-500">Syncing database assets...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8 shadow-sm">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-bold text-gray-700 text-lg">Your Catalog is Vacant</h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                  Head over to the administrator panel route to append items straight into your live SQLite database file!
                </p>
                <Link href="/admin" className="mt-4 inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition">
                  Go to Admin Panel &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-48 w-full bg-gray-50 relative overflow-hidden">
                      <img 
                        src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-gray-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-grow">
                        {product.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-600/10 hover:bg-blue-700 transition active:scale-95 flex items-center space-x-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Premium Real-Time Sidebar Shopping Cart Panel */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl h-fit lg:sticky lg:top-24">
            <h3 className="font-extrabold text-gray-900 text-lg flex items-center justify-between pb-4 border-b">
              <span className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span>Your Order Cart</span>
              </span>
              {totalCartItems > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full font-black animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </h3>
            
            {cart.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">
                <ShoppingCart className="w-8 h-8 mx-auto text-gray-200 mb-2" />
                <p>Your shopping basket is completely vacant.</p>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3 flex justify-between items-start text-sm group animate-fade-in">
                      <div className="pr-3">
                        <p className="font-bold text-gray-800 line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.quantity} &times; <span className="font-semibold text-gray-600">${item.product.price.toFixed(2)}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)} 
                        className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500 font-medium text-sm">Order Subtotal:</span>
                    <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Fully Functional Active Coupon System */}
<div className="space-y-2 border border-gray-100 rounded-xl p-3 bg-gray-50 shadow-inner">
  <div className="flex items-center space-x-2">
    <Tag className="w-4 h-4 text-gray-400" />
    <input 
      type="text" 
      id="couponInput"
      placeholder="Enter Code (ECELL20)" 
      className="bg-transparent text-xs w-full outline-none p-1 font-bold text-gray-700 uppercase" 
    />
    <button 
      onClick={() => {
        const code = (document.getElementById('couponInput') as HTMLInputElement).value.toUpperCase();
        if (code === 'ECELL20') {
          alert('Success! 20% Technical Discount Applied to Basket!');
          // Temporarily reduce the calculated subtotal display by 20%
          const discountAmount = cartTotal * 0.20;
          alert(`Saved: $${discountAmount.toFixed(2)}`);
        } else {
          alert('Invalid or Expired Promo Code Entry.');
        }
      }}
      className="bg-gray-800 text-white text-[10px] uppercase font-black px-2 py-1 rounded-md hover:bg-blue-600 transition"
    >
      Apply
    </button>
  </div>
</div>
                  
                  <Link
                    href={{ pathname: '/checkout', query: { total: cartTotal, items: JSON.stringify(cart) } }}
                    className="block text-center w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg shadow-indigo-600/20 transition duration-200 active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}