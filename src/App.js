
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, ArrowLeft, X, CheckCircle, Search } from 'lucide-react';

// --- Mock Data Simulation ---
// ✅ Moved outside so it's treated as a constant
const mockProducts = [
  {
    id: 'prod1',
    name: 'Modern Laptop',
    description: 'A sleek, powerful laptop for all your professional and creative needs. Featuring a stunning Retina display and long battery life.',
    price: 999.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Laptop',
  },
  {
    id: 'prod2',
    name: 'Wireless Mouse',
    description: 'Ergonomic and precise, this mouse offers seamless connectivity and a comfortable grip for hours of work or gaming.',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Mouse',
  },
  {
    id: 'prod3',
    name: 'Mechanical Keyboard',
    description: 'Experience satisfying tactile feedback with every keystroke. Built to last with a durable aluminum frame and customizable RGB lighting.',
    price: 129.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Keyboard',
  },
  {
    id: 'prod4',
    name: '4K Monitor',
    description: 'Immerse yourself in stunning detail with this 27-inch 4K monitor. Perfect for designers, video editors, and gamers.',
    price: 349.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Monitor',
  },
  {
    id: 'prod5',
    name: 'Noise-Cancelling Headphones',
    description: 'Tune out the world with these over-ear headphones. Delivers crystal-clear audio and industry-leading noise cancellation.',
    price: 199.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Headphones',
  },
  {
    id: 'prod6',
    name: 'Webcam',
    description: 'High-definition video for professional-quality calls and streaming. Features auto-focus and a wide-angle lens.',
    price: 69.99,
    imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=Webcam',
  },
];

// Main App component
const App = () => {
  const [view, setView] = useState('products');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // ✅ Safe now, no missing dependency warning
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsLoading(true);
    console.log('Simulating checkout for:', cart);
    setTimeout(() => {
      setIsLoading(false);
      setOrderComplete(true);
      setCart([]);
      setTimeout(() => {
        setOrderComplete(false);
        setView('products');
      }, 3000);
    }, 2000);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- UI Components ---
  const Header = () => (
    <header className="bg-white sticky top-0 z-10 shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center space-x-2">
        {view !== 'products' && (
          <button onClick={() => setView('products')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-green-700">Serverless Store</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-48 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setView('cart')}
          className="relative p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );

  const ProductList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-green-600 font-bold mb-4">${product.price.toFixed(2)}</p>
            <div className="mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ProductDetails = ({ product }) => (
    <div className="p-6 flex flex-col md:flex-row md:space-x-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-auto rounded-lg object-cover mb-4 md:mb-0" />
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-green-600 font-extrabold text-2xl mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button
          onClick={() => {
            addToCart(product);
            setSelectedProduct(null);
            setView('products');
          }}
          className="bg-green-500 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-green-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const CartView = () => (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-100 rounded-lg text-gray-500">
          <Package size={48} className="mb-4" />
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <p className="text-sm">Add some amazing products!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="text-gray-600">Items ({cart.length})</span>
              <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-green-600">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const OrderConfirmation = () => (
    <div className="flex flex-col items-center justify-center p-16 bg-white rounded-lg shadow-lg text-center my-8">
      <CheckCircle size={80} className="text-green-500 mb-4 animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Complete!</h2>
      <p className="text-gray-600 text-lg">Thank you for your purchase.</p>
    </div>
  );

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        `}
      </style>
      <Header />
      <main className="container mx-auto max-w-7xl py-8">
        {orderComplete && <OrderConfirmation />}
        {isLoading && view === 'products' && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700"></div>
          </div>
        )}
        {!isLoading && !orderComplete && view === 'products' && !selectedProduct && <ProductList />}
        {!isLoading && !orderComplete && view === 'products' && selectedProduct && <ProductDetails product={selectedProduct} />}
        {!isLoading && !orderComplete && view === 'cart' && <CartView />}
      </main>
    </div>
  );
};

export default App;
