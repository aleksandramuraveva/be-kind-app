import { format } from 'date-fns'

const Card = ({ onEdit, onDelete, content, date }) => {
  return (
    <div className="flex-1 relative block min-w-[250px] max-w-[300px] min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <p className="text-shadow2 tracking-wider font-semibold text-my-pink font-normal text-gray-700 dark:text-gray-400 break-words py-3">
        {content}
      </p>
      {onEdit && (
        <>
          <button
            className="absolute top-3 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={onDelete}
          >
            &times;
          </button>
          <button
            className="absolute top-2 right-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={onEdit}
          >
            &hellip;
          </button>
        </>
      )}
      <span className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-300">
        {date}
      </span>
    </div>
  );
};

export default Card;
