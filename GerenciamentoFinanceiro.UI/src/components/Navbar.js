import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import '../css/gridView.css';

const Layout = ({ children, onLogout }) => {
    return (
        <div className="grid-view-container">
            <nav className="navbar">
                <ul>
                    <li><a href="/" onClick={(e) => e.preventDefault()}>Cadastrar Transação</a></li>
                    <li><a href="/" onClick={(e) => e.preventDefault()}>Meus Relatórios</a></li>
                    <li><a href="/dashboard">Meu Dashboard</a></li>
                </ul>
                <div className="logout-icon" onClick={onLogout}>
                    <FaSignOutAlt size={24} title="Logout" />
                </div>
            </nav>
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
