import React from 'react';
import { Link } from 'react-router-dom';

const SharedPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-vulnmap-dark text-white font-sans flex flex-col p-4 lg:p-8">
      <nav className="flex justify-between items-center py-5 px-6 border border-vulnmap-border mb-6 max-w-7xl mx-auto w-full">
        <Link to="/" className="text-3xl font-mono tracking-widest font-bold">DFX</Link>
        <Link to="/scan" className="bg-brand-green text-black px-6 py-2 font-mono font-bold hover:bg-green-400 transition">
          GET A DEMO
        </Link>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-mono font-bold mb-4">{title}</h1>
        <p className="text-gray-400 max-w-lg mx-auto">This page is under construction for the hackathon demo.</p>
      </main>
    </div>
  );
};

export default SharedPage;
