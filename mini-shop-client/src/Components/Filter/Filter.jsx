import React from 'react';

function Filter({ onFilter }) {
  const handleFilterChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <div>
      <select onChange={handleFilterChange}>
        <option value=''>Все категории</option>
        <option value='0'>Телефоны</option>
        <option value='1'>Ноутбуки</option>
        <option value='2'>Телевизоры</option>
        <option value='3'>Холодильники</option>
      </select>
    </div>
  );
}

export default Filter;
