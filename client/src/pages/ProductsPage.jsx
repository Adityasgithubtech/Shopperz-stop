import { useEffect, useState, useCallback } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import { useFilter } from '../context/FilterContext';

export default function ProductsPage() {
  const { filter } = useFilter();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const PRODUCTS_PER_PAGE = 20;

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    try {
      const skip = currentPage * PRODUCTS_PER_PAGE;
      const response = await fetch(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`);
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    if (!filter || Object.keys(filter).length === 0) {
      setDisplayedProducts(products);
    } else {
      const filtered = products.filter(product =>
        filter.category ? product.category === filter.category : true
      );
      setDisplayedProducts(filtered);
    }
  }, [filter, products]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && page === 0) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      <FilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
        {loading && <p className="col-span-full text-center">Loading more products...</p>}
        {!hasMore && <p className="col-span-full text-center text-gray-400">No more products</p>}
      </div>
    </div>
  );
}
