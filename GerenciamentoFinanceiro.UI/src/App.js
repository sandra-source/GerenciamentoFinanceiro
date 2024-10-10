import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderOptions from './components/HeaderOptions';
import Login from './components/Login';
import GridView from './components/GridView';
import Dashboard from './pages/Dashboard';
import './css/styles.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<GridView />} />
                <Route path="/cadastrar-despesa" element={<div>Cadastrar Despesa</div>} />
                <Route path="/cadastrar-receita" element={<div>Cadastrar Receita</div>} />
                <Route path="/meus-relatorios" element={<div>Meus Relatórios</div>} />
            </Routes>
        </Router>
    );
}

export default App;