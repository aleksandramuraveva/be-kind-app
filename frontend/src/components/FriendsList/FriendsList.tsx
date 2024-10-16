import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchFriendDeeds } from '../../store/friendsSlice';
import { Friend } from '../../types';

interface FriendsListProps {
  friends: Friend[];
  onFriendClick: (userId: number) => void;
  onDeleteFriend: (userId: number) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends, onFriendClick, onDeleteFriend }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <ul className="pl-5">
      {friends.map((friend) => (
        <li
          key={friend.userId}
          className="text-shadow3 flex text-my-blue items-center cursor-pointer hover:text-white"
        >
          <span className="text-red-500 mr-1">❤️</span>
          <span
            onClick={() => {
              onFriendClick(friend.userId);
              dispatch(fetchFriendDeeds(friend.userId));
            }}
            className="mr-2"
          >
            {friend.username}
          </span>
          <button
            onClick={() => onDeleteFriend(friend.userId)}
            className="ml-2 text-gray-200 hover:text-red-500"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;
