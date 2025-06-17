import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(setProduct)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="text-indian_red-500 text-center mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-lg mt-10 text-light_coral-500 animate-pulse">Loading product...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-melon-100 dark:bg-melon-900 text-bittersweet_shimmer-900 dark:text-melon-100 rounded-lg shadow-lg transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full max-h-[500px] object-cover rounded-lg shadow-md"
        />

        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-bittersweet_shimmer-600 dark:text-light_coral-400">{product.title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
          
          <p className="text-2xl font-semibold text-indian_red-500">${product.price}</p>

          <div className="text-sm space-y-1">
            <p className="text-yellow-700 dark:text-yellow-400">⭐ Rating: {product.rating}</p>
            <p>Brand: <span className="font-medium">{product.brand}</span></p>
            <p>Category: <span className="capitalize font-medium">{product.category}</span></p>
            <p>Stock Available: <span className={product.stock < 10 ? 'text-red-600' : 'text-green-700'}>{product.stock}</span></p>
            <p className="text-red-500">Discount: {product.discountPercentage}%</p>
          </div>

          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 bg-bittersweet_shimmer-500 text-white rounded hover:bg-bittersweet_shimmer-600 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
