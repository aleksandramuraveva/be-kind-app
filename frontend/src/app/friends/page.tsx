'use client';

import React, { useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import FriendsList from '../../components/FriendsList/FriendsList';
import Dashboard from '../../components/Dashboard/Dashboard';

const FriendsPage = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState(['Friend1', 'Friend2', 'Friend3']); // Manage state for friends

  const handleFriendClick = (friendName) => {
    setSelectedFriend(friendName);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const results = ['User1', 'User2', 'User3'].filter(user => user.includes(searchTerm));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = (friend) => {
    setFriends([...friends, friend]);
    setSearchResults(searchResults.filter(result => result !== friend));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="mb-10 text-2xl flex justify-center">
        {searchResults.length > 0 ? (
          <SearchResultsList results={searchResults} onAddFriend={handleAddFriend} />
        ) : (
          searchResults.length === 0 && <p>No people found</p>
        )}
      </div>
      <div className="pb-10 text-2xl flex justify-center">
        <FriendsList friends={friends} onFriendClick={handleFriendClick} />
      </div>
      {selectedFriend && <Dashboard friendName={selectedFriend} />}
    </div>
  );
};

export default FriendsPage;

