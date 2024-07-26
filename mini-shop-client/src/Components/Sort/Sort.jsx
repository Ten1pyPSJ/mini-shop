import React, { useState } from 'react';

function Sort({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  return (
    <div>
      <input type='text' placeholder='Поиск...' value={searchTerm} onChange={handleSearch} />
    </div>
  );
}

export default Sort;
