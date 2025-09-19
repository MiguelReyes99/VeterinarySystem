import '../modals/Modal.css'
import * as React from "react";
import { ModalAddSuccess } from '../modals/ModalAddSuccess';

export function ModalAdd({ onClose, fetchData }) {
    const [rol, setRol] = React.useState("Default");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const API_DB_URL= "https://veterinarysystem-r6yx.onrender.com/api-users-v1";

    const roles = [
        { value: 'Default', label: 'Seleccione un rol...'},
        { value: 'Admin', label: 'Admin' },
        { value: 'Encargado', label: 'Encargado' },
        { value: 'Recepcionista', label: 'Recepcionista' },
        { value: 'Veterinario', label: 'Veterinario' }
    ];

    // Boton Agregar
    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstName == "" || lastName == "" || rol == "Default" || username == "" || password == "") {
            setError(true);
            setErrorMessage("Todos los campos deben de estar llenos");
            return;
        }

        fetch(`${API_DB_URL}/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                position: rol,
                username: username,
                password: password,
                status: 1
            })
        })
        .then(response => response.json())
        .then(() => {
            setError(false);
            setShowSuccessModal(true);
            fetchData();
        })
        .catch(() => {
            setError(true);
            setErrorMessage("Error al guardar el usuario")
        })
    };

    const handleCloseSuccess = () => {
        setShowSuccessModal(false);
        onClose();
    }

    return (
        <>
            <div className="modal-backdrop">
                <div className="modal">
                    <h2>Nuevo Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <h3>First Name:</h3>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                        <h3>Last Name:</h3>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <h3>Rol:</h3>
                        <select id="select-roles" value={rol} onChange={(e) => setRol(e.target.value)}>
                            {roles.map((rol) => (
                                <option key={rol.value} value={rol.value} disabled={rol.value === 'Default'}>
                                    {rol.label}
                                </option>
                            ))}
                        </select>

                        <h3>Username:</h3>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <h3>Password:</h3>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && <p className="error">{errorMessage}</p>}

                        <div className="modal-actions">
                            <button type="submit">Agregar</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>

            {showSuccessModal && <ModalAddSuccess onClose={handleCloseSuccess} />}
        </>
    );
}