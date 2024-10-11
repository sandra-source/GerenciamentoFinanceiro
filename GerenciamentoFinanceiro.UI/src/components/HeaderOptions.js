// HeaderOptions.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import '../css/styles.css';

const HeaderOptions = ({ handleLogout }) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/home">Cadastrar Transação</Link>
                </li>
                <li>
                    <Link to="/meus-relatorios">Meus Relatórios</Link>
                </li>
                <li>
                    <Link to="/dashboard">Meu Dashboard</Link>
                </li>
            </ul>
            <div className="logout-icon" onClick={handleLogout}>
                <FaSignOutAlt size={24} title="Logout" />
            </div>
        </nav>
    );
};

export default HeaderOptions;
