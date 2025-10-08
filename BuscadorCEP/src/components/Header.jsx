import React from "react";
import {Link} from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Início</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">Sobre</Link>
          </li>
          <li className="nav-item">
            {/* Adicione mais links aqui, se precisar */}
            <Link to="/contact" className="nav-link">Contato</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;