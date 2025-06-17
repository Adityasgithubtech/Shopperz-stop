import { useFilter } from '../context/FilterContext';

export default function FilterPanel() {
  const { filter, setFilter } = useFilter();

  const handleSearchChange = (e) => {
    setFilter(prev => ({ ...prev, query: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setFilter(prev => ({ ...prev, price: Number(e.target.value) }));
  };

  return (
    <div className="flex gap-4 flex-wrap mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={filter.query}
        onChange={handleSearchChange}
        className="border px-4 py-2 rounded w-full sm:w-1/2"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label htmlFor="priceRange" className="text-sm font-medium">
          Max Price: ${filter.price}
        </label>
        <input
          id="priceRange"
          type="range"
          min="0"
          max="2000"
          step="50"
          value={filter.price}
          onChange={handlePriceChange}
          className="w-48"
        />
      </div>
    </div>
  );
}
