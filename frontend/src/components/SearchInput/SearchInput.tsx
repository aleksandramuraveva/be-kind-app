import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search for friends..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded-l w-2/3"
      />
      <button
        onClick={handleSearchClick}
        className="border shadow-md text-white px-4 py-2 rounded-r hover:opacity-80 transition duration-300 bg-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
