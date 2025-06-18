import { useState } from 'react';
import { useFilter } from '../context/FilterContext';

export default function FilterPanel() {
  const { setFilter } = useFilter();
  
  // Local state for inputs
  const [category, setCategory] = useState('');

  const handleApplyFilter = () => {
    const newFilter = {};
    if (category.trim() !== '') {
      newFilter.category = category.trim();
    }
    setFilter(newFilter); // update context when button clicked
  };

  return (
    <div className="w-1/3 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-1 font-medium">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bittersweet_shimmer-500"
          placeholder="e.g. smartphones"
        />
      </div>

      <button
        onClick={handleApplyFilter}
        className="w-full bg-bittersweet_shimmer-500 text-white px-4 py-2 rounded hover:bg-bittersweet_shimmer-600 transition"
      >
        Apply Filter
      </button>
    </div>
  );
}
