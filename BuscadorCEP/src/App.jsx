// src/App.jsx
//  App.jsx é o componente "raiz" da aplicação, onde todos os outros componentes são aninhados.
import React from 'react';
import './App.css'; // Opcional: para estilização geral do App
import BuscadorDeCEP from './components/BuscadorDeCEP';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import UsarParam from './pages/UsarParam';

function App() {
  return (
    <div className="app-container">
      
      <BrowserRouter>

          <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/post/:id" element={<UsarParam />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;