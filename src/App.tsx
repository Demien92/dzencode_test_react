import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationMenu } from './components/layout/NavigationMenu/NavigationMenu';
import { Header } from './components/layout/Header/Header';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import './App.scss';

export const App: React.FC = () => {
  return (
    <>
      <main>
        <Header />
        <div className="wrapper">
          <NavigationMenu />
          <div className="wrapper__page">
            <Routes>
              <Route path="/" element={<Navigate to="/orders" />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};
