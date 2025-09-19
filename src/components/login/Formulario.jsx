import '../login/Formulario.css';
import * as React from 'react';

export function Formulario({ setUser, setRol }) {
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const API_DB_URL= "https://veterinarysystem-r6yx.onrender.com/api-users-v1";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name == "" || password == "") {
            setError("empty");
            return;
        }

        await fetch(`${API_DB_URL}/user?username=${name}&password=${password}`, {
            method: "GET"
        })
            .then((response) => {
                if (!response.ok) {
                    console.error("Error fetching data: ", response.statusText);
                    setError("notFound");
                    return;
                }
                return response.json(); 
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data.username));
                localStorage.setItem("rol", JSON.stringify(data.position));

                setUser(data.username);
                setRol(data.position);
            })
            .catch((error) => {
                console.error(error);
                setError("server");
            });
    };

    return (
        <section>
            <h1>Login</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <p>Usuario:</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p>Password:</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Iniciar sesion</button>
            </form>
            {error === 'empty' && <p>Todos los campos son obligatorios</p>}
            {error === 'notFound' && <p>Credenciales incorrectas</p>}
            {error === 'server' && <p>Error del servidor. Intente más tarde.</p>}
        </section>
    );
}
