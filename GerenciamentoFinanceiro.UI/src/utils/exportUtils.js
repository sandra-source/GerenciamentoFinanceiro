// utils/exportUtils.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Função para exportar em PDF
export const exportToPdf = (data) => {
    const doc = new jsPDF();
    const tableColumn = ["Tipo", "Descrição", "Valor (R$)", "Forma de pagamento", "Vencimento", "Status"];
    const tableRows = [];

    data.forEach(item => {
        const rowData = [
            item.tipo ? item.tipo : 'N/A',
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

// Função para exportar em Excel
export const exportToExcel = (data) => {
    // Criar uma nova planilha com os dados
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    // Salvar o arquivo Excel
    XLSX.writeFile(workbook, `relatorio_transacoes_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
