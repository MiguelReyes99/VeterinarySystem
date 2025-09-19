import { TableUsers } from './tableUsers/TableUsers';
import * as React from 'react';

export function Home({ user, setUser, rol, setRol }) {
    const [dataTable, setDataTable] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const API_DB_URL= "https://veterinarysystem-r6yx.onrender.com/api-users-v1";

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('rol');
        setRol('')
        setUser('');
    };

    const fetchData = async () => {
        await fetch(`${API_DB_URL}/usersList`)
            .then((response) => {
                if (!response.ok) {
                    console.error("Error fetching data: ", response.statusText);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    console.error("Unexpected data format: ", data);
                    setDataTable([]);
                    return;
                }
                setDataTable(data);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setDataTable([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    React.useEffect(() => {
        if (rol === 'Admin') {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [rol])

    return (
        <div>
            <h1>
                {user && rol && `Bienvenido ${rol} ${user}`}
                {user && !rol && "Cargando..."}
                {!user && "No se encontró el usuario"}
            </h1>
            <br />
            <button onClick={handleLogout}>Salir</button>

            {isLoading ? (
                <p>Cargando datos...</p>
            ) : rol === 'Admin' ? (
                dataTable && dataTable.length > 0 ? (
                    <TableUsers dataTable={dataTable} fetchData={fetchData} />
                ) : (
                    <p>No se encontraron registros.</p>
                )
            ) : (
                <p>No tienes permisos</p>
            )}
        </div>
    );
}
