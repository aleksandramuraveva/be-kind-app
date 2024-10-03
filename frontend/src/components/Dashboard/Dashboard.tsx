import React from 'react';
import GoodDeedsList from "../GoodDeedsList/GoodDeedsList";

const Dashboard = ({ friendName }) => {
  const displayName = friendName || "Your";
  const title = displayName === "Your" ? "Your Good Deeds" : `${displayName}'s Good Deeds`;

  return (
    <section className="relative  p-4 mt-10">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="/images/wings.png" alt="Wings" className="filter brightness-110" />
      </div>
      <div className="text-center mb-4 mt-6">
        <h2 className="text-shadow3 text-my-blue text-xl font-bold">{title}</h2>
      </div>
      <GoodDeedsList />
    </section>
  );
};

export default Dashboard;
