import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action
    onSearch(query); // Calls the onSearch function passed as a prop
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow">
      <input
        type="text"
        placeholder="Enter Steam ID here..."
        className="input"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default SearchBar;
