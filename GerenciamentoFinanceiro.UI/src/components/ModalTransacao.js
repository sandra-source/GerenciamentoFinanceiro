import React, { useState, useEffect } from 'react';
import '../css/modal.css';

const Status = {
    0: 'Pendente',
    1: 'Pago',
    2: 'Em Negociação',
    3: 'Vencido',
};

const Natureza = {
    0: 'Recorrente',
    1: 'Não Recorrente',
};

const FormaDePagamento = {
    0: 'Cartão',
    1: 'Dinheiro',
    2: 'Transferência',
    3: 'Pix',
    4: 'Cheque',
};

const ModalTransacao = ({ isOpen, onClose, onSubmit, transacao }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [origem, setOrigem] = useState('');
    const [formaDePagamento, setFormaDePagamento] = useState(0); 
    const [dataVencimento, setDataVencimento] = useState('');
    const [dataPagamento, setDataPagamento] = useState(''); 
    const [tipo, setTipo] = useState(1);
    const [status, setStatus] = useState(0);
    const [natureza, setNatureza] = useState(0);

    useEffect(() => {
        if (transacao) {
            setDescricao(transacao.descricao || '');
            setValor(transacao.valor || '');
            setCategoria(transacao.categoria || '');
            setOrigem(transacao.origem || '');
            setFormaDePagamento(transacao.formaDePagamento || 0);
            setDataVencimento(transacao.dataVencimento ? new Date(transacao.dataVencimento).toISOString().split('T')[0] : '');
            setTipo(transacao.tipo);
            setStatus(transacao.status);
            setNatureza(transacao.natureza || 0);
            setDataPagamento(transacao.dataPagamento ? new Date(transacao.dataPagamento).toISOString().split('T')[0] : ''); 
        } else {
            resetForm();
        }
    }, [transacao]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const novaTransacao = {
            descricao,
            valor: parseFloat(valor),
            categoria,
            origem,
            formaDePagamento: parseInt(formaDePagamento), 
            dataVencimento: dataVencimento ? new Date(dataVencimento).toISOString() : null,
            dataPagamento: dataPagamento ? new Date(dataPagamento).toISOString() : null, 
            tipo: parseInt(tipo),
            status: parseInt(status),
            natureza: parseInt(natureza)
        };
    
        if (transacao && transacao.id) {
            novaTransacao.id = transacao.id;
        }
    
        onSubmit(novaTransacao);
        resetForm();
    };
    

    const resetForm = () => {
        setDescricao('');
        setValor('');
        setCategoria('');
        setOrigem('');
        setFormaDePagamento(0);
        setDataVencimento('');
        setDataPagamento(''); 
        setTipo(0);
        setStatus(0);
        setNatureza(0);
    };

    const handleValorChange = (e) => {
        let valorInput = e.target.value;

        valorInput = valorInput.replace(',', '.');

        setValor(valorInput);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <button className="close" onClick={onClose}>x</button>
                <h2>{transacao ? 'Editar Transação' : 'Cadastrar Nova Transação'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Descrição</label>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} 
                        required 
                    />
                    <label>Valor</label>
                    <input 
                        type="number" 
                        placeholder="Valor" 
                        value={valor}
                        onChange={handleValorChange} 
                        required 
                    />
                    <label>Categoria</label>
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)} 
                    />
                    <label>Origem</label>
                    <input 
                        type="text" 
                        placeholder="Origem" 
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)} 
                    />
                    <label>Forma de Pagamento</label>
                    <select 
                        value={formaDePagamento} 
                        onChange={(e) => setFormaDePagamento(parseInt(e.target.value))} 
                        required
                    >
                        {Object.keys(FormaDePagamento).map((key) => (
                            <option key={key} value={key}>{FormaDePagamento[key]}</option>
                        ))}
                    </select>
                    <label>Data de Vencimento</label>
                    <input 
                        type="date" 
                        placeholder="Data de Vencimento" 
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)} 
                        required
                    />
                    <label>Data de Pagamento</label> 
                    <input 
                        type="date" 
                        placeholder="Data de Pagamento" 
                        value={dataPagamento}
                        onChange={(e) => setDataPagamento(e.target.value)} 
                    />
                    <label>Tipo</label>
                    <select 
                        value={tipo}  
                        onChange={(e) => setTipo(parseInt(e.target.value))} 
                        required
                    >
                        <option value={0}>Receita</option>
                        <option value={1}>Despesa</option>
                    </select>
                    <label>Status</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(parseInt(e.target.value))} 
                        required
                    >
                        {Object.keys(Status).map((key) => (
                            <option key={key} value={key}>{Status[key]}</option>
                        ))}
                    </select>
                    <label>Natureza</label>
                    <select 
                        value={natureza} 
                        onChange={(e) => setNatureza(parseInt(e.target.value))} 
                        required
                    >
                        {Object.keys(Natureza).map((key) => (
                            <option key={key} value={key}>{Natureza[key]}</option>
                        ))}
                    </select>
                    <div>
                        <button className="margin05" type="submit">Salvar</button>
                        <button className="margin05" type="button" onClick={onClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalTransacao;
