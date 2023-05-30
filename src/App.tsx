import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { SideBar } from './components/layout/SideBar/SideBar';
import { Header } from './components/layout/Header/Header';
import { Users } from './pages/Users';

export const App: React.FC = () => {
  return (
    <>
      <main>
        <Header />
        <div className="wrapper">
          <SideBar />
          <div className="wrapper__page">
            <Routes>
              <Route path="/" element={<Navigate to="/users" />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};
