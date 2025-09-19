import '../modals/Modal.css'

export function ModalDelete({ onConfirm, onCancel }) {
    return (
        <div className="modal-backdrop">
        <div className="modal">
            <h3>¿Estás seguro de eliminar este registro?</h3>
            <div className="modal-actions">
                <button className="danger" onClick={onConfirm}>Sí, eliminar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    </div>
    );
}
