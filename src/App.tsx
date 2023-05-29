import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Users } from './pages/Users';

export const App: React.FC = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
};
