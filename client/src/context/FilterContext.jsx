import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState({
    query: '',
    category: '',
    minPrice: 0,
    maxPrice: 2000,
  });

  const clearFilters = () => {
    setFilter({
      query: '',
      category: '',
      minPrice: 0,
      maxPrice: 2000,
    });
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
