import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchGoodDeeds, addDeed } from '../../store/goodDeedsSlice';
import GoodDeedsList from '../GoodDeedsList/GoodDeedsList';
import Modal from '../Modal/Modal';

const Dashboard = ({ friendName }: { friendName?: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const goodDeeds = useSelector((state: RootState) => state.goodDeeds.deeds);
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeed, setNewDeed] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchGoodDeeds(userId));
    }
  }, [dispatch, userId]);

  const displayName = friendName || 'Your';
  const title =
    displayName === 'Your' ? 'Your Good Deeds' : `${displayName}'s Good Deeds`;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeed('');
  };

  const handleNewDeedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDeed(e.target.value);
  };

  const addNewDeed = async () => {
  if (userId) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/good-deeds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: Number(userId), content: newDeed }), 
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addDeed(data));
      closeModal();
    } else {
      console.error('Failed to add deed:', await response.json()); 
    }
  }
};


  return (
    <section className="relative p-4 mt-10">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src="/images/wings.png"
          alt="Wings"
          className="filter brightness-110"
        />
      </div>
      <div className="text-center mb-3 mt-8">
        <h2 className="text-shadow text-white text-3xl font-bold">{title}</h2>
      </div>
      {displayName === 'Your' && (
        <button
          onClick={openModal}
          className="block mx-auto mb-1 bg-white text-my-pink rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:opacity-80 transition duration-300 hover:-translate-y-1"
        >
          +
        </button>
      )}
      <GoodDeedsList
        addedDeed={newDeed}
        ownDashboard={displayName === 'Your'}
        goodDeeds={goodDeeds}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <textarea
          value={newDeed}
          onChange={handleNewDeedChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          placeholder="Describe your good deed..."
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={addNewDeed}
            className="bg-my-blue text-white px-4 py-2 rounded"
          >
            Add Deed
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Dashboard;
