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
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <div className="p-4 border rounded shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p>{product.description.substring(0, 60)}...</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-bittersweet_shimmer-600 font-semibold">₹{product.price}</span>
        <span className="flex items-center text-yellow-500">
          <FaStar className="mr-1" /> {product.rating}
        </span>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded text-white transition ${
            isClicked ? 'bg-green-600' : 'bg-bittersweet_shimmer-500 hover:bg-bittersweet_shimmer-600'
          }`}
        >
          {isClicked ? 'Added!' : 'Add to Cart'}
        </button>

        <Link
          to={`/product/${product.id}`}
          className="px-4 py-2 rounded text-white bg-bittersweet_shimmer-500 hover:bg-bittersweet_shimmer-600 text-center transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
