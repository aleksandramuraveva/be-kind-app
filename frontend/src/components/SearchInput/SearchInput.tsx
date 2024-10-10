import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { searchFriends } from '../../store/friendsSlice';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(searchFriends(e.target.value));
  };

  const handleSearchClick = () => {
    dispatch(searchFriends(searchTerm));
    setSearchTerm('');
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
