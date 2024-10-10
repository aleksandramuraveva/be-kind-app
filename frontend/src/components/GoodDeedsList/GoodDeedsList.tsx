import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchGoodDeeds, updateDeed, deleteDeed } from '../../store/goodDeedsSlice';
import Card from '../Card/Card';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Modal from '../Modal/Modal';

const GoodDeedsList = ({ ownDashboard, goodDeeds }: { ownDashboard: boolean, goodDeeds: GoodDeed[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [currentCardContent, setCurrentCardContent] = useState('');

  const showMoreCards = () => {
    setVisible((prevVisible) => prevVisible + 6);
  };

  const openModal = (content: string, index: number) => {
    setCurrentCardContent(content);
    setCurrentCardIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCardContent('');
    setCurrentCardIndex(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCardContent(e.target.value);
  };

  const saveChanges = async () => {
    if (currentCardIndex !== null) {
      const updatedDeed = { id: goodDeeds[currentCardIndex].id, content: currentCardContent };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/good-deeds/${updatedDeed.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: currentCardContent }),
      });

      if (response.ok) {
        dispatch(updateDeed(updatedDeed));
        closeModal();
      }
    }
  };

  const deleteCard = async (index: number) => {
    const deedId = goodDeeds[index].id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/good-deeds/${deedId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      dispatch(deleteDeed(deedId));
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-center items-stretch">
        {Array.isArray(goodDeeds) && goodDeeds.slice(0, visible).map((deed, index) => (
          <Card
            key={deed.id}
            content={deed.content}
            onEdit={ownDashboard ? () => openModal(deed.content, index) : null}
            onDelete={ownDashboard ? () => deleteCard(index) : null}
          />
        ))}
      </div>
      {visible < goodDeeds.length && <ShowMoreButton onClick={showMoreCards} />}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <textarea
          value={currentCardContent}
          onChange={handleEditChange}
          className="mt-4 w-full p-2 border border-gray-300 rounded"
          rows="4"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={saveChanges}
            className="bg-my-blue text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GoodDeedsList;
