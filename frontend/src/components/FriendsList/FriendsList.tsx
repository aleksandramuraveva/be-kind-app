const FriendsList = ({ friends, onFriendClick }) => {
  return (
    <ul className="list-disc pl-5">
      {friends.map(friend => (
        <li key={friend} onClick={() => onFriendClick(friend)} className="cursor-pointer">
          {friend}
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;

