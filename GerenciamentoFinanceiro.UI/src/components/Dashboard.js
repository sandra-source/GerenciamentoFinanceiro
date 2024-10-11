import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../css/dashboard.css';

const Dashboard = () => {
    const lineOptions = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Receitas Mensais'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        series: [{
            name: 'Receitas',
            data: [1200, 1900, 3000, 5000, 2300, 3200, 2100, 1500, 4000, 2900, 3700, 4200],
            type: 'line'
        }]
    };

    const barOptions = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Despesas Totais'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        series: [{
            name: 'Despesas',
            data: [1500, 2500, 1000, 4000, 2000, 3500, 1200, 1000, 3000, 2800, 3300, 4100],
            type: 'column'
        }]
    };

    const pieOptions = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Distribuição de Receitas'
        },
        series: [{
            name: 'Receitas',
            data: [
                { name: 'Vendas', y: 4000 },
                { name: 'Serviços', y: 3000 },
                { name: 'Outros', y: 2000 }
            ],
            type: 'pie'
        }]
    };

    const transactionsOptions = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Transações por Mês'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        series: [{
            name: 'Receitas',
            data: [1200, 1900, 3000, 5000, 2300, 3200, 2100, 1500, 4000, 2900, 3700, 4200],
            type: 'line'
        }]
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard de Despesas e Receitas</h2>
            <div className="charts-row">
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={barOptions}
                    />
                </div>
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={barOptions}
                    />
                </div>
            </div>
            <div className="charts-row">
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={pieOptions}
                    />
                </div>
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={lineOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
