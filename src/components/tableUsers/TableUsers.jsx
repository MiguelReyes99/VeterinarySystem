import '../tableUsers/TableUsers.css';
import * as React from 'react';
import { BsPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
import { BsPersonXFill } from "react-icons/bs";
import { ModalEdit } from '../modals/modalEdit';
import { ModalDelete } from '../modals/modalDelete';
import { ModalAdd } from '../modals/ModalAdd';

export function TableUsers({ dataTable, fetchData }) {
    const [editUser, setEditUser] = React.useState(null);
    const [deleteUserId, setDeleteUserId] = React.useState(null);
    const [newUser, setNewUSer] = React.useState(false);
    const API_DB_URL= "https://veterinarysystem-r6yx.onrender.com/api-users-v1";

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleDelete = (id) => {
        setDeleteUserId(id);
    };

    const handleNew = () => {
        setNewUSer(true);
    }

    const handleConfirm = () => {
        fetch(`${API_DB_URL}/delete/${deleteUserId}`, {
            method: 'DELETE'
        }).then(() => {
            fetchData();
            setDeleteUserId(null);
        })
    };

    return (
        <div>
            <h2>Registros</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Rol</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((registro) => (
                            <tr key={registro.id}>
                                <td>{registro.firstName}</td>
                                <td>{registro.lastName}</td>
                                <td>{registro.position}</td>
                                <td>{registro.username}</td>
                                <td>{registro.password}</td>
                                <td>{registro.status === 1 ? (
                                    <BsPersonCheckFill />
                                ) : (
                                    <BsPersonXFill />
                                )}
                                </td>
                                <td className="field-actions">
                                    <button className="button-action" onClick={() => handleEdit(registro)}>
                                        <BsPencilFill />
                                    </button>
                                    <button className="button-action" onClick={() => handleDelete(registro.id)}>
                                        <BsTrashFill />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => handleNew()}>Nuevo Usuario</button>
            {editUser && (
                <ModalEdit user={editUser} onClose={() => setEditUser(null)}  fetchData={fetchData} />
            )}
            {deleteUserId && (
                <ModalDelete onConfirm={handleConfirm} onCancel={() => setDeleteUserId(null)} />
            )}
            {newUser && (
                <ModalAdd onClose={() => setNewUSer(false)} fetchData={fetchData} />
            )}
        </div>
    );
}