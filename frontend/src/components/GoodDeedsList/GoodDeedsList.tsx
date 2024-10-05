
import React, { useState, useEffect } from 'react';
import Card from "../Card/Card";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import Modal from "../Modal/Modal";

const GoodDeedsList = ({ addedDeed }) => {
  const [visible, setVisible] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [currentCardContent, setCurrentCardContent] = useState("");

  const initialCards = [
    "Good deed 1", 
    "Good deed 2", 
    "Good deed 3", 
    "Good deed 4", 
    "Good deed 5", 
    "Good deed 6", 
    "Good deed 7",
    "Good deed 4", 
    "Good deed 5", 
    "Good deed 6", 
    "Good deed 7"
  ];

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    if (addedDeed) {
      setCards(prevCards => [addedDeed, ...prevCards]);
    }
  }, [addedDeed]);

  const showMoreCards = () => {
    setVisible(prevVisible => prevVisible + 6);
  };

  const openModal = (content, index) => {
    setCurrentCardContent(content);
    setCurrentCardIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCardContent("");
    setCurrentCardIndex(null);
  };

  const handleEditChange = (e) => {
    setCurrentCardContent(e.target.value);
  };

  const saveChanges = () => {
    const updatedCards = [...cards];
    updatedCards[currentCardIndex] = currentCardContent;
    setCards(updatedCards);
    closeModal();
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.slice(0, visible).map((content, index) => (
          <Card key={index} content={content} onEdit={() => openModal(content, index)} />
        ))}
      </div>
      {visible < cards.length && (
        <ShowMoreButton onClick={showMoreCards} />
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={saveChanges}>
        <textarea 
          value={currentCardContent} 
          onChange={handleEditChange} 
          className="mt-4 w-full p-2 border border-gray-300 rounded" 
          rows="4"
        />
        <div className="flex justify-end mt-4">
          <button onClick={saveChanges} className="bg-my-blue text-white px-4 py-2 rounded">Edit</button>
        </div>
      </Modal>
    </div>
  );
};

export default GoodDeedsList;


