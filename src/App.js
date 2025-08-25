// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvatarPage from './pages/Convert';
import Home from './pages/Home';
import LearnSign from './pages/LearnSign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/learn-sign" element={<LearnSign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
