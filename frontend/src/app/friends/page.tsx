'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { searchFriends, addFriend, fetchFriendDeeds, fetchFriends, deleteFriend } from '../../store/friendsSlice';
import SearchInput from '../../components/SearchInput/SearchInput';
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import FriendsList from '../../components/FriendsList/FriendsList';
import Dashboard from '../../components/Dashboard/Dashboard';
import { useRouter } from 'next/navigation';

const FriendsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { friends, searchResults, friendDeeds } = useSelector((state: RootState) => state.friends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const userId = (typeof window !== 'undefined') ? localStorage.getItem('userId') : null; 

  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth'); 
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }



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
        dispatch(fetchFriends(Number(userId))); 
      }
    });
  };

  const handleDeleteFriend = (friendId: number) => {
    dispatch(deleteFriend(friendId)).then(() => {
      if (userId) {
        dispatch(fetchFriends(Number(userId)));
        setSelectedFriend(null);
      }
    });
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
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
      {selectedFriend && <Dashboard friendId={selectedFriend.userId} friendName={selectedFriend.username} />}
    </div>
  );
};

export default FriendsPage;
