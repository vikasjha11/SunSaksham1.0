// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvatarPage from './pages/Convert';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatar" element={<AvatarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
