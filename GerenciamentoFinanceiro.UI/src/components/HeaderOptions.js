// HeaderOptions.js
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import '../css/styles.css';

const HeaderOptions = ({ handleLogout, onDashboardClick }) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a onClick={() => onDashboardClick()}>Meu Dashboard</a>
                </li>
                <li>
                    <a onClick={() => onDashboardClick(false)}>Cadastrar Transação</a>
                </li>
                <li>
                    <a href="/meus-relatorios">Meus Relatórios</a>
                </li>
                
            </ul>
            <div className="logout-icon" onClick={handleLogout}>
                <FaSignOutAlt size={24} title="Logout" />
            </div>
        </nav>
    );
};

export default HeaderOptions;

