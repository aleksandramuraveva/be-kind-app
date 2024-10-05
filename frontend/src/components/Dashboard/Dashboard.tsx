import React, { useState } from 'react';
import GoodDeedsList from "../GoodDeedsList/GoodDeedsList";
import Modal from "../Modal/Modal";

const Dashboard = ({ friendName}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeed, setNewDeed] = useState("");
  const [addedDeed, setAddedDeed] = useState(null);

  const displayName = friendName || "Your";
  const title = displayName === "Your" ? "Your Good Deeds" : `${displayName}'s Good Deeds`;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeed("");
  };

  const handleNewDeedChange = (e) => {
    setNewDeed(e.target.value);
  };

  const addNewDeed = () => {
    setAddedDeed(newDeed);
    closeModal();
  };

  return (
    <section className="relative p-4 mt-10">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/images/wings.png" alt="Wings" className="filter brightness-110" />
      </div>
      <div className="text-center mb-3 mt-8">
        <h2 className="text-shadow text-white text-3xl font-bold">{title}</h2>
      </div>
      {displayName === "Your" && (
        <button
          onClick={openModal}
          className="block mx-auto mb-4 bg-white text-my-blue rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:opacity-80 transition duration-300 hover:-translate-y-1"
        >
          +
        </button>
      )}
      <GoodDeedsList addedDeed={addedDeed} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <textarea
          value={newDeed}
          onChange={handleNewDeedChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          placeholder="Describe your good deed..."
        />
        <div className="flex justify-end mt-4">
          <button onClick={addNewDeed} className="bg-my-blue text-white px-4 py-2 rounded">Add Deed</button>
        </div>
      </Modal>
    </section>
  );
};

export default Dashboard;



