'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchFriends, addFriend, fetchFriendDeeds, fetchFriends } from '../../store/friendsSlice';
import SearchInput from '../../components/SearchInput/SearchInput';
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import FriendsList from '../../components/FriendsList/FriendsList';
import Dashboard from '../../components/Dashboard/Dashboard';

const FriendsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { friends, searchResults, friendDeeds } = useSelector((state: RootState) => state.friends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const userId = (typeof window !== 'undefined') ? localStorage.getItem('userId') : null; // Check if window is defined

  useEffect(() => {
    if (userId) {
      dispatch(fetchFriends(Number(userId)));
    }
  }, [dispatch, userId]);

  const handleFriendClick = (friendId: number) => {
    setSelectedFriend(friends.find(friend => friend.userId === friendId) || null);
    dispatch(fetchFriendDeeds(friendId));
    console.log('Friend ID:', friendId);
  };

  const handleSearch = (searchTerm: string) => {
    dispatch(searchFriends(searchTerm));
  };

  const handleAddFriend = (friendUniqueTag: string) => {
    dispatch(addFriend(friendUniqueTag)).then(() => {
      if (userId) {
        dispatch(fetchFriends(Number(userId))); // Fetch updated friends list
      }
    });
  };

  const handleDeleteFriend = (index: number) => {
    // Implement delete friend functionality
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="mb-10 text-2xl flex justify-center">
        {searchResults.length > 0 ? (
          <SearchResultsList
            results={searchResults}
            onAddFriend={handleAddFriend}
          />
        ) : (
          searchResults.length === 0 && (
            <p className="text-white">No people found</p>
          )
        )}
      </div>
      <div className="pb-20 text-2xl flex justify-center">
        <FriendsList
          friends={friends}
          onFriendClick={handleFriendClick}
          onDeleteFriend={handleDeleteFriend}
        />
      </div>
      {selectedFriend && <Dashboard friendId={selectedFriend.userId} friendName={selectedFriend.username} />} {/* Pass friendId and friendName to Dashboard */}
    </div>
  );
};

export default FriendsPage;


