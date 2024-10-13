import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderOptions from './components/HeaderOptions';
import Login from './components/Login';
import GridView from './components/GridView';
import Dashboard from './components/Dashboard';
import './css/styles.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<GridView />} />
            </Routes>
        </Router>
    );
}

export default App;