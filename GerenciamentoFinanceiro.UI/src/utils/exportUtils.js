import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const getTipoNome = (tipo) => {
    switch (tipo) {
        case 0:
            return 'Receita';
        case 1:
            return 'Despesa';
        default:
            return 'N/A';
    }
};

const getStatusNome = (status) => {
    switch (status) {
        case 0:
            return 'Pendente';
        case 1:
            return 'Pago';
        case 2:
            return 'Em Negociação';
        case 3:
            return 'Vencido';
        default:
            return 'N/A';
    }
};

const getNaturezaNome = (natureza) => {
    switch (natureza) {
        case 0:
            return 'Recorrente';
        case 1:
            return 'Não Recorrente';
        default:
            return 'N/A';
    }
};

const getFormaPagamentoNome = (formaDePagamento) => {
    switch (formaDePagamento) {
        case 0:
            return 'Cartão';
        case 1:
            return 'Dinheiro';
        case 2:
            return 'Transferência';
        case 3:
            return 'Pix';
        case 4:
            return 'Cheque';
        default:
            return 'N/A';
    }
};

const formatarValor = (valor) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`; 
};

export const exportToPdf = (data) => {
    const doc = new jsPDF();
    const tableColumn = [
        "Tipo", 
        "Descrição", 
        "Valor (R$)", 
        "Forma de pagamento", 
        "Vencimento", 
        "Pagamento", 
        "Status", 
        "Natureza"
    ];
    const tableRows = [];

    data.forEach(item => {
        const rowData = [
            getTipoNome(item.tipo), 
            item.descricao,
            formatarValor(item.valor), 
            getFormaPagamentoNome(item.formaDePagamento), 
            item.dataVencimento ? item.dataVencimento.substring(0, 10).split('-').reverse().join('/') : 'N/A', 
            item.dataPagamento ? item.dataPagamento.substring(0, 10).split('-').reverse().join('/') : 'N/A', 
            getStatusNome(item.status), 
            getNaturezaNome(item.natureza) 
        ];
        tableRows.push(rowData);
    });

    doc.text("Relatório de Transações", 14, 15);
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
    });
    doc.save(`relatorio_transacoes_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const exportToExcel = (data) => {
    const formattedData = data.map(item => ({
        Tipo: getTipoNome(item.tipo), 
        Descrição: item.descricao,
        "Valor (R$)": formatarValor(item.valor), 
        "Forma de pagamento": getFormaPagamentoNome(item.formaDePagamento), 
        Vencimento: item.dataVencimento ? item.dataVencimento.substring(0, 10).split('-').reverse().join('/') : 'N/A',
        Pagamento: item.dataPagamento ? item.dataPagamento.substring(0, 10).split('-').reverse().join('/') : 'N/A',
        Status: getStatusNome(item.status), 
        Natureza: getNaturezaNome(item.natureza) 
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, `relatorio_transacoes_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
