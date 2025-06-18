import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000); // Reset after 2s
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-lg truncate">{product.title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="text-sm text-gray-500">
          <span className="font-medium">Brand:</span> {product.brand}
        </div>

        <div className="text-sm text-gray-500">
          <span className="font-medium">Category:</span> {product.category}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-bittersweet_shimmer-600 font-bold text-lg">
            ${product.price}
          </span>

          <div className="flex items-center text-yellow-500 text-sm">
            <FaStar className="mr-1" />
            {product.rating}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isClicked}
          className={`mt-3 w-full px-4 py-2 rounded text-white font-semibold transition text-sm
            ${isClicked
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-bittersweet_shimmer-500 hover:bg-bittersweet_shimmer-600'}`}
        >
          {isClicked ? 'Added to Cart' : 'Add to Cart'}
        </button>

        <Link
          to={`/products/${product.id}`}
          className="mt-2 w-full text-center block px-4 py-2 rounded text-sm font-medium text-bittersweet_shimmer-600 border border-bittersweet_shimmer-500 hover:bg-bittersweet_shimmer-50 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
