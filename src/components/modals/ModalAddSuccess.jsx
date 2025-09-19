import '../modals/Modal.css'

export function ModalAddSuccess({ onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>Usuario registrado con éxito</h3>
                <button onClick={onClose}>Aceptar</button>
            </div>
        </div>
    );
}