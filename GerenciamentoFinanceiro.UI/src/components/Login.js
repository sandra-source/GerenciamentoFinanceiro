import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import '../css/login.css';
import { login } from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        try {
            const data = await login(email, password);
            console.log('Login bem-sucedido:', data);

            sessionStorage.setItem("Token", data.token)
            console.log("dataaa", data)
            window.location.href = '/home';
        } catch (error) {
            console.error('Erro de login:', error);
            setErrorMessage(error.message || 'Falha ao fazer login, verifique suas credenciais.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="left-panel">
                    <h1>FinMaps</h1>
                    <p>Novo por aqui? Conheça FinMaps, o seu gerenciamento financeiro!</p>
                </div>
                <div className="right-panel">
                    <form onSubmit={handleSubmit}>
                        <h2>Sign in</h2>
                        <div className="input-group">
                            <FaUserAlt className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-button">LOGIN</button>
                        {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
