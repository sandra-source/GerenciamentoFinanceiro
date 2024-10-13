import React from 'react';
import HeaderOptions from './HeaderOptions';
import ModalTransacao from './ModalTransacao';
import '../css/styles.css';

const MainLayout = ({
    children,
    isModalOpen,
    setModalOpen,
    transacaoAtual,
    handleNewTransaction,
    handleLogout,
}) => {
    return (
        <div className="main-layout">
            <HeaderOptions handleLogout={handleLogout} />
            {isModalOpen && (
                <ModalTransacao
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleNewTransaction}
                    transacao={transacaoAtual}
                />
            )}
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
