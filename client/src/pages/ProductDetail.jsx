import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.title} has been added to your cart!`);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link
        to="/"
        className="inline-block mb-4 px-4 py-2 bg-bittersweet_shimmer-500 text-white rounded hover:bg-bittersweet_shimmer-600 transition"
      >
        ← Back to Products
      </Link>

      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

      <div className="w-full h-64 overflow-hidden rounded mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="mb-4">{product.description}</p>

      <div className="flex items-center justify-between text-lg font-semibold mb-4">
        <span>Price: ₹{product.price}</span>
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-500" /> {product.rating}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isClicked}
        className={`w-full px-4 py-2 rounded text-white font-semibold transition text-sm
          ${isClicked
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-bittersweet_shimmer-500 hover:bg-bittersweet_shimmer-600'}`}
      >
        {isClicked ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
