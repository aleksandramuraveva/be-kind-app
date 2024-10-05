const FriendsList = ({ friends, onFriendClick, onDeleteFriend }) => {
  return (
    <ul className="pl-5">
      {friends.map((friend, index) => (
        <li key={friend} className="text-shadow3 flex text-my-blue items-center cursor-pointer hover:text-white">
          <span className="text-red-500 mr-1">❤️</span>
          <span onClick={() => onFriendClick(friend)} className="mr-2">
            {friend}
          </span>
          <button
            onClick={() => onDeleteFriend(index)}
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



