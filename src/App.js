// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvatarPage from './pages/Convert';
import Home from './pages/Home';
import LearnSign from './pages/LearnSign';
import Dictionary from './pages/Dictionary';
import Practice from './pages/Practice';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/learn-sign" element={<LearnSign />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
