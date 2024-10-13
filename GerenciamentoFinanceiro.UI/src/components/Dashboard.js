import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { obterReceitasDespesasPorMes } from '../services/dashboardService';
import '../css/dashboard.css';

const Dashboard = () => {
    const [receitasPorMes, setReceitasPorMes] = useState(Array(12).fill(0));  
    const [despesasPorMes, setDespesasPorMes] = useState(Array(12).fill(0));  
    const [isLoading, setIsLoading] = useState(true);

    // Meses do ano em ordem
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dados = await obterReceitasDespesasPorMes();

                const receitasTemp = Array(12).fill(0);
                const despesasTemp = Array(12).fill(0);
    
                dados.forEach(item => {
                    const mesIndex = item.mes - 1;  
                    receitasTemp[mesIndex] = item.totalReceitas;
                    despesasTemp[mesIndex] = item.totalDespesas;
                });
                
    
                setReceitasPorMes(receitasTemp);
                setDespesasPorMes(despesasTemp);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao carregar os dados do dashboard:', error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    const barOptionsReceitasTotais = {
        chart: {
            width: 800,
            height: 300 
        },
        title: {
            text: 'Minhas Receitas em 2024'
        },
        xAxis: {
            categories: meses
        },
        series: [{
            name: 'Receitas',
            data: receitasPorMes,
            type: 'column'
        }]
    };

    const barOptionsDespesasTotais = {
        chart: {
            width: 800,
            height: 300 
        },
        title: {
            text: 'Minhas Despesas em 2024'
        },
        xAxis: {
            categories: meses
        },
        series: [{
            name: 'Despesas',
            data: despesasPorMes,  
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

    const lineOptions = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Distribuição de Despesas'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        series: [{
            name: 'Despesas',
            data: [1200, 1900, 3000, 5000, 2300, 3200, 2100, 1500, 4000, 2900, 3700, 4200],
            type: 'line'
        }]
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Dashboard de Despesas e Receitas</h2>
            <div className="charts-row">
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={barOptionsReceitasTotais}
                    />
                </div>
                <div className="chart-container">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={barOptionsDespesasTotais}
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
