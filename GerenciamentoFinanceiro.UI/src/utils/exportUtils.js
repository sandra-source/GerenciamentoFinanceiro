import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Função para mapear o valor do tipo para o nome correspondente
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

export const exportToPdf = (data) => {
    const doc = new jsPDF();
    const tableColumn = ["Tipo", "Descrição", "Valor (R$)", "Forma de pagamento", "Vencimento", "Status"];
    const tableRows = [];

    data.forEach(item => {
        const rowData = [
            getTipoNome(item.tipo), // Mapeia o tipo para o nome
            item.descricao,
            item.valor,
            item.formaDePagamento,
            item.dataVencimento ? new Date(item.dataVencimento).toLocaleDateString('pt-BR') : 'N/A',
            item.status
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
    // Mapeia os dados para incluir o nome do tipo em vez do valor numérico
    const formattedData = data.map(item => ({
        Tipo: getTipoNome(item.tipo), // Mapeia o tipo para o nome
        Descrição: item.descricao,
        "Valor (R$)": item.valor,
        "Forma de pagamento": item.formaDePagamento,
        Vencimento: item.dataVencimento ? new Date(item.dataVencimento).toLocaleDateString('pt-BR') : 'N/A',
        Status: item.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, `relatorio_transacoes_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
