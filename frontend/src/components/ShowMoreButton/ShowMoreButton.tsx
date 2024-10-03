const ShowMoreButton = ({ onClick }) => {
  return (
  	
    <div className="flex justify-center mt-4">
    <button
      className="border shadow-md text-white px-4 py-2 rounded hover:opacity-80 transition duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      Show More
    </button>

     </div>
  );
};

export default ShowMoreButton