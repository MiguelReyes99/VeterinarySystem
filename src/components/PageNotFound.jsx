import { Link } from 'react-router-dom';

export function PageNotFound() {
    return (
        <div>
            <h1>404. Page Not Found!</h1>
            <h2>Esta página no existe...</h2>
            <br></br>
            <Link to="/home">Regresar</Link>
        </div>
    );
}