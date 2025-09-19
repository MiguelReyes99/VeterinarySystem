import '../modals/Modal.css'
import * as React from "react";
// import { API_DB_URL } from '../../assets/apiConstants';

export function ModalEdit({ user, onClose, fetchData }) {
    const [formData, setFormData] = React.useState({ ...user });
    const API_DB_URL= "https://veterinarysystem-r6yx.onrender.com/api-users-v1";

    const roles = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Encargado', label: 'Encargado' },
        { value: 'Recepcionista', label: 'Recepcionista' },
        { value: 'Veterinario', label: 'Veterinario' }
    ];

    const estados = [
        { value: 0, label: "Inactive"},
        { value: 1, label: "Active"}
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            status: Number(formData.status)
        };

        await fetch(`${API_DB_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then((res) => {
            if (!res.ok) {
                console.error("Error fetching data: ", response.statusText);
                return;
            }
            return res.json();
        })
        .then((data) => console.log(data))
        .catch((error) => Error("Error: ", error))

        fetchData();
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Editar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <h3>First Name:</h3>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} />
                    <h3>Last Name:</h3>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} />
                    <h3>Rol:</h3>
                    <select name="position" id="select-roles" value={formData.position} onChange={handleChange}>
                        {roles.map((rol) => (
                            <option key={rol.value} value={rol.value}>
                                {rol.label}
                            </option>
                        ))}
                    </select>
                    <h3>Username:</h3>
                    <input name="username" value={formData.username} onChange={handleChange} />
                    <h3>Password:</h3>
                    <input name="password" value={formData.password} onChange={handleChange} />
                    <h3>Status:</h3>
                    <select name="status" id="select-status" value={formData.status} onChange={handleChange}>
                        {estados.map((state) =>
                            formData.status === 1 && state.value === 0 ? (
                                <option key={state.value} value={state.value} disabled>
                                    {state.label}
                                </option>
                            ) : (
                                <option key={state.value} value={state.value}>
                                    {state.label}
                                </option>
                            )
                        )}
                    </select>
                    <div className="modal-actions">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
