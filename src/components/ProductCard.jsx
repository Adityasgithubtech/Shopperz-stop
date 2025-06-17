import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const getStockBadge = (stock) => {
    if (stock === 0)
      return <span className="text-xs text-red-600 font-semibold">Out of Stock</span>;
    if (stock < 10)
      return <span className="text-xs text-yellow-600 font-semibold">Low Stock</span>;
    return <span className="text-xs text-green-600 font-semibold">In Stock</span>;
  };

  return (
    <div className="border border-moss_green-300 rounded shadow hover:shadow-xl p-4 bg-white dark:bg-gray-800 transition-all duration-300">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-3 space-y-2">
        <h2 className="text-hunter_green-600 dark:text-mindaro-400 font-semibold text-lg">
          {product.title}
        </h2>

        <p className="text-dark_green-700 dark:text-white font-bold text-lg">
          ${product.price}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {product.description.slice(0, 100)}{product.description.length > 100 && '...'}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span>{product.rating}</span>
          </div>
          {getStockBadge(product.stock)}
        </div>

        <button
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price
            })
          }
          disabled={product.stock === 0}
          className={`w-full px-4 py-2 mt-2 rounded font-medium ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-mindaro-500 text-dark_green-800 hover:bg-mindaro-300'
          }`}
        >
          {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
        </button>

        <Link
          to={`/product/${product.id}`}
          className="block text-center text-blue-700 dark:text-blue-400 mt-2 underline hover:text-blue-900"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
