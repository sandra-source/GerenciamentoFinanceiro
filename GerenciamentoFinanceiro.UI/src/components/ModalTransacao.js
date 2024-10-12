import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const Status = {
    0: 'Pendente',
    1: 'Pago',
    2: 'Em Negociação',
    3: 'Vencido',
};

const ModalTransacao = ({ isOpen, onClose, onSubmit, transacao }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [origem, setOrigem] = useState('');
    const [formaDePagamento, setFormaDePagamento] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [tipo, setTipo] = useState(1);
    const [status, setStatus] = useState(0); 

    useEffect(() => {
        if (transacao) {
            setDescricao(transacao.descricao || '');
            setValor(transacao.valor || '');
            setCategoria(transacao.categoria || '');
            setOrigem(transacao.origem || '');
            setFormaDePagamento(transacao.formaDePagamento || '');
            setDataVencimento(transacao.dataVencimento ? new Date(transacao.dataVencimento).toISOString().split('T')[0] : '');
            setTipo(transacao.tipo);
            setStatus(transacao.status);
        } else {
            resetForm();
        }
    }, [transacao]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const novaTransacao = {
            id: transacao ? transacao.id : null,
            descricao,
            valor: parseFloat(valor),
            categoria,
            origem,
            formaDePagamento,
            dataVencimento: dataVencimento ? new Date(dataVencimento).toISOString() : null,
            tipo: parseInt(tipo),
            status: parseInt(status),
        };
        onSubmit(novaTransacao);
    };

    const resetForm = () => {
        setDescricao('');
        setValor('');
        setCategoria('');
        setOrigem('');
        setFormaDePagamento('');
        setDataVencimento('');
        setTipo(0);
        setStatus(2);
    };

    if (!isOpen) return null;

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
                    />
                    <input 
                        type="text" 
                        placeholder="Origem" 
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Forma de Pagamento" 
                        value={formaDePagamento}
                        onChange={(e) => setFormaDePagamento(e.target.value)} 
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
                        {Object.keys(Status).map((key) => (
                            <option key={key} value={key}>{Status[key]}</option>
                        ))}
                    </select>
                    <div>
                        <button class="margin05" type="submit">Salvar</button>
                        <button class="margin05" type="button" onClick={onClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTransacao;