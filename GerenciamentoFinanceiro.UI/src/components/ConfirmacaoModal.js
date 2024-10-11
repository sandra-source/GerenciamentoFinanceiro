import React from 'react';
import '../css/modal.css';

const ConfirmacaoModal = ({ isOpen, onClose, onConfirm, descricao }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay open">
            <div className="modal open">
                <button className="close" onClick={onClose}>x</button>
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir esta transação?</p>
                <p><strong>Descrição da transação:</strong> {descricao}</p>
                <div>
                    <button className="margin010" onClick={onConfirm}>Confirmar</button>
                    <button className="margin010 cancelar-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacaoModal;