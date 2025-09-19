import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Formulario } from './components/login/Formulario';
import { Home } from './components/Home';
import * as React from 'react';
import './App.css';

function App() {
    const [user, setUser] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return '';
        }
    });
    const [rol, setRol] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('rol'));
        } catch {
            return '';
        }
    });

    return (
        <Router>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Formulario setUser={setUser} setRol={setRol} />} />
                <Route path="/home" element={user ? <Home user={user} setUser={setUser} rol={rol} setRol={setRol} /> : <Navigate to="/login" replace />} />
                <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
            </Routes>
        </Router>
    );
}

export default App;
