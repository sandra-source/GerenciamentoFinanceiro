// modaltransacao.js
import React, { useState } from 'react';
import '../css/modal.css';

const ModalTransacao = ({ isOpen, onClose, onSubmit }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState(0); // 0 para Receita, 1 para Despesa
    const [status, setStatus] = useState(2); // Pendente como padrão
    const [categoria, setCategoria] = useState('');
    const [origem, setOrigem] = useState('');
    const [formaDePagamento, setFormaDePagamento] = useState('');
    const [dataVencimento, setDataVencimento] = useState(''); // Novo estado para Data de Vencimento

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let dataVencimentoFormatada = null;
        if (dataVencimento) {
            try {
                // Converte a data para o formato desejado com a hora padrão e fuso horário
                const date = new Date(dataVencimento);
                if (!isNaN(date.getTime())) {
                    dataVencimentoFormatada = date.toISOString(); // Formato padrão ISO 8601
                }
            } catch (error) {
                console.error("Erro ao formatar a data de vencimento:", error);
            }
        }
    
        const novaTransacao = {
            descricao,
            valor: parseFloat(valor),
            tipo,
            status,
            categoria,
            origem,
            formaDePagamento,
            dataVencimento: dataVencimentoFormatada,
        };
        onSubmit(novaTransacao);
        resetForm();
    };
    

    const resetForm = () => {
        setDescricao('');
        setValor('');
        setTipo(0);
        setStatus(2);
        setCategoria('');
        setOrigem('');
        setFormaDePagamento('');
        setDataVencimento('');
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <button className="close" onClick={onClose}>x</button>
                <h2>Cadastrar Nova Transação</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} 
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
                        type="number" 
                        placeholder="Valor" 
                        value={valor}
                        onChange={(e) => setValor(e.target.value)} 
                        required 
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
                    <input 
                        type="date" 
                        placeholder="Data de Vencimento" 
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)} 
                    />
                    <div>
                        <button className="margin010" type="submit">Cadastrar</button>
                        <button className="margin010" type="button" onClick={onClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTransacao;
