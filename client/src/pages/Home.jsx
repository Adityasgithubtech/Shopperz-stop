import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import { useFilter } from '../context/FilterContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { filter } = useFilter();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${filter.query}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.products.filter(p => p.price <= filter.price);
        setProducts(filtered);
      });
  }, [filter]);

  return (
    <div className="p-4">
      <FilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
