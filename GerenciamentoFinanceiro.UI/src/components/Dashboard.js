import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../css/dashboard.css';

// Registrando os componentes necessários do chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // Dados para o gráfico de linha (Receitas mensais)
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Receitas',
                data: [1200, 1900, 3000, 5000, 2300, 3200, 2100, 1500, 4000, 2900, 3700, 4200],
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#4bc0c0',
            },
        ],
    };

    // Dados para o gráfico de pizza (Distribuição de receitas por categoria)
    const pieData = {
        labels: ['Vendas', 'Serviços', 'Outros'],
        datasets: [
            {
                data: [4000, 3000, 2000],
                backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
                hoverBackgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
            },
        ],
    };

    // Dados para o gráfico de barras (Despesas totais por mês)
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Despesas',
                data: [1500, 2500, 1000, 4000, 2000, 3500, 1200, 1000, 3000, 2800, 3300, 4100],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard de Despesas e Receitas</h2>
            <div className="charts-row">
                <div className="chart-container">
                    <h3>Receitas Mensais</h3>
                    <Line data={lineData} />
                </div>
                <div className="chart-container">
                    <h3>Despesas Totais</h3>
                    <Bar data={barData} />
                </div>
            </div>
            <div className="charts-row">
                <div className="chart-container">
                    <h3>Distribuição de Receitas</h3>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
