import { useEffect, useState, useRef, useCallback } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import { useFilter } from '../context/FilterContext';

export default function ProductsPage() {
  const { filter } = useFilter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();
  const productsPerPage = 20;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const skip = (page - 1) * productsPerPage;
      const url = filter.query
        ? `https://dummyjson.com/products/search?q=${filter.query}&limit=${productsPerPage}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();

      const filtered = data.products.filter(p => p.price <= filter.price);

      setProducts(prev => [...prev, ...filtered]);
      setHasMore(filtered.length > 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  // Fetch when page changes
  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  // Reset products if filter changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [filter]);

  // Infinite scroll observer
  const observerElement = useCallback(
    node => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-center text-5xl font-extrabold mb-6 tracking-tight">
        <span className="uppercase text-8xl font-logo tracking-wide" style={{ color: '#2D3142' }}>
          Shopperz
        </span>
        <span className="ml-2 italic text-gray-500">Stop</span>
      </h1>

      <FilterPanel />

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div key={product.id} ref={observerElement}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </div>

      {loading && (
        <p className="text-center text-lg mt-10 animate-pulse">Loading more products...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-sm text-gray-500 mt-6">No more products to show.</p>
      )}
    </div>
  );
}
