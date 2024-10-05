const SearchResultsList = ({ results, onAddFriend }) => {
  return (
    <ul className="list-disc pl-5">
      {results.map((result) => (
        <li
          key={result}
          className="flex justify-between items-center mt-2 text-white"
        >
          {result}
          <div className="relative group">
            <button
              onClick={() => onAddFriend(result)}
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
