import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addFriend } from '../../store/friendsSlice';
import { Friend } from '../../types';

interface SearchResultsListProps {
  results: Friend[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  const dispatch: AppDispatch = useDispatch();
  const [updatedResults, setUpdatedResults] = useState<Friend[]>(results);

  useEffect(() => {
    setUpdatedResults(results);
  }, [results]);

  const handleAddFriend = (friendUniqueTag: string) => {
    dispatch(addFriend(friendUniqueTag)).then(() => {
      const newResults = updatedResults.filter(
        (result) => result.uniqueTag !== friendUniqueTag,
      );
      setUpdatedResults(newResults);
    });
  };

  return (
    <ul className="list-disc pl-5">
      {updatedResults.map((result) => (
        <li
          key={result.userId}
          className="flex justify-between items-center mt-2 text-white"
        >
          {result.username}
          <div className="relative group">
            <button
              onClick={() => handleAddFriend(result.uniqueTag)}
              className="text-sm ml-2 block mx-auto bg-white text-my-pink rounded-full w-5 h-5 flex items-center justify-center shadow-lg hover:opacity-80 transition duration-300 hover:-translate-y-0.5"
            >
              +
            </button>
            <span className="absolute top-1/2 left-full transform -translate-y-1/2 px-4 py-2 ml-2 bg-gray-100 text-my-blue text-xs rounded opacity-0 whitespace-nowrap group-hover:opacity-100 transition duration-200">
              Add as a friend
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResultsList;
