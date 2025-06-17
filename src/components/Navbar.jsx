import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaPhone, FaInfoCircle, FaBars } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-gray-800 dark:to-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo / Home */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors"
      >
        🛍️ ShopperzStop
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <Link to="/contact" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <FaPhone /> Contact
        </Link>
        <Link to="/about" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <FaInfoCircle /> About
        </Link>
        <Link to="/auth" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <FaUser /> Login / Register
        </Link>
      </div>

      {/* Mobile Menu and Cart */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <FaBars className="text-xl" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2 z-50">
              <Link
                to="/contact"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaPhone /> Contact
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaInfoCircle /> About
              </Link>
              <Link
                to="/auth"
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser /> Login / Register
              </Link>
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="relative">
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
          >
            <FaShoppingCart className="text-lg" />
            <span className="text-sm font-medium">Cart ({cart.length})</span>
          </Link>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full animate-pulse">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
