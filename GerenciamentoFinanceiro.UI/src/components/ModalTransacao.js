
import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const ModalTransacao = ({ isOpen, onClose, onSubmit, transacao }) => {
    const [id, setId] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState(0);
    const [status, setStatus] = useState(2);
    const [categoria, setCategoria] = useState('');
    const [origem, setOrigem] = useState('');
    const [formaDePagamento, setFormaDePagamento] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');

    useEffect(() => {
        if (transacao) {
            setId(transacao.id || null);
            setDescricao(transacao.descricao);
            setValor(transacao.valor);
            setTipo(transacao.tipo);
            setStatus(transacao.status);
            setCategoria(transacao.categoria);
            setOrigem(transacao.origem);
            setFormaDePagamento(transacao.formaDePagamento);
            setDataVencimento(transacao.dataVencimento ? new Date(transacao.dataVencimento).toISOString().slice(0, 10) : '');
        } else if (isOpen) {
            setId(null);
            setDescricao('');
            setValor('');
            setTipo(0);
            setStatus(2);
            setCategoria('');
            setOrigem('');
            setFormaDePagamento('');
            setDataVencimento('');
        }
    }, [transacao, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const novaTransacao = {
            id, // Inclui o ID na transação
            descricao,
            valor: parseFloat(valor),
            tipo,
            status,
            categoria,
            origem,
            formaDePagamento,
            dataVencimento: dataVencimento ? new Date(dataVencimento).toISOString() : null,
        };

        onSubmit(novaTransacao);
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <button className="close" onClick={onClose}>x</button>
                <h2>{transacao ? 'Editar Transação' : 'Cadastrar Nova Transação'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} 
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Valor" 
                        value={valor}
                        onChange={(e) => setValor(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Origem" 
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Forma de Pagamento" 
                        value={formaDePagamento}
                        onChange={(e) => setFormaDePagamento(e.target.value)} 
                        required 
                    />
                    <input 
                        type="date" 
                        placeholder="Data de Vencimento" 
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)} 
                    />
                    <select 
                        value={tipo} 
                        onChange={(e) => setTipo(parseInt(e.target.value))} 
                        required
                    >
                        <option value={0}>Receita</option>
                        <option value={1}>Despesa</option>
                    </select>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(parseInt(e.target.value))} 
                        required
                    >
                        <option value={2}>Pendente</option>
                        <option value={3}>Pago</option>
                        <option value={4}>Em Negociação</option>
                    </select>
                    <div>
                        <button className="margin010" type="submit">Salvar</button>
                        <button className="margin010" type="button" onClick={onClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTransacao;
