import React, { useState } from 'react';
import { Icons } from './Icons';

const SearchFilter = ({ onSearch, onFilter, filters, placeholder = 'Search...' }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFilterChange = (filterCategory, value) => {
    if (onFilter) {
      onFilter({ ...filters, [filterCategory]: value });
    }
  };

  return (
    <div className="search-filter">
      <div style={{ flex: 1, position: 'relative' }}>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          style={{ paddingLeft: '2.5rem' }}
        />
        <Icons.Search
          size={16}
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
          }}
        />
      </div>
      {Object.entries(filters || {}).map(([key, options]) => (
        <select
          key={key}
          className="filter-select"
          value={options.value || ''}
          onChange={(e) =>
            handleFilterChange(key, e.target.value)
          }
        >
          <option value="">{key}</option>
          {options.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default SearchFilter;

