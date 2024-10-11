import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderOptions from './components/HeaderOptions';
import Login from './components/Login';
import GridView from './components/GridView';
import Dashboard from './components/Dashboard';
import './css/styles.css'; 
import RelatoriosView from './components/RelatorioView';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<GridView />} />
                <Route path="/cadastrar-despesa" element={<div>Cadastrar Despesa</div>} />
                <Route path="/cadastrar-receita" element={<div>Cadastrar Receita</div>} />
                <Route path="/meus-relatorios" element={<RelatoriosView />} />
            </Routes>
        </Router>
    );
}

export default App;