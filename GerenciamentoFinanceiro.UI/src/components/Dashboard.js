import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { obterReceitasDespesasPorMes, obterDistribuicaoReceitasDespesas, obterReceitasDespesasPagasPorMes } from '../services/dashboardService';
import '../css/dashboard.css';

const Dashboard = () => {
    const [receitasPorMes, setReceitasPorMes] = useState(Array(12).fill(0));  
    const [despesasPorMes, setDespesasPorMes] = useState(Array(12).fill(0));  
    const [dadosDistribuicao, setDadosDistribuicao] = useState({});  // Dados da distribuição de receitas/despesas
    const [receitasPagasPorMes, setReceitasPagasPorMes] = useState([]);  // Dados de receitas pagas por mês
    const [despesasPagasPorMes, setDespesasPagasPorMes] = useState([]);  // Dados de despesas pagas por mês
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

                // Carregar os dados da distribuição de receitas e despesas
                const dadosDistribuicao = await obterDistribuicaoReceitasDespesas();
                setDadosDistribuicao(dadosDistribuicao);

                // Carregar os dados de receitas e despesas pagas por mês
                const receitasDespesasPagas = await obterReceitasDespesasPagasPorMes();
                setReceitasPagasPorMes(receitasDespesasPagas.receitasPagasNoPrazo.concat(receitasDespesasPagas.receitasPagasAposVencimento));
                setDespesasPagasPorMes(receitasDespesasPagas.despesasPagasNoPrazo.concat(receitasDespesasPagas.despesasPagasAposVencimento));

                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao carregar os dados do dashboard:', error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);

    // Verifica se todos os valores são zero para esconder o gráfico se necessário
    const todosZeros = 
        dadosDistribuicao.receitasPagasAtraso === 0 &&
        dadosDistribuicao.receitasPagasPrazo === 0 &&
        dadosDistribuicao.despesasPagasAtraso === 0 &&
        dadosDistribuicao.despesasPagasPrazo === 0;

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
        yAxis: {
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false 
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
        yAxis: {
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false // Remove a marca d'água "highcharts.com"
        },
        series: [{
            name: 'Despesas',
            data: despesasPorMes,  
            type: 'column'
        }]
    };

    // Gráfico de pizza com a distribuição de receitas e despesas
    const pieDespesasReceitasPagasAno = {
        chart:{
            width: 800,
            height: 300 
        },
        title: {
            text: 'Distribuição de Despesas e Receitas Pagas'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false // Remove a marca d'água "highcharts.com"
        },
        series: [{
            name: 'Transações',
            data: [
                { name: 'Despesas Pagas em Atraso', y: dadosDistribuicao.despesasPagasAtraso || 0 },
                { name: 'Receitas Pagas em Atraso', y: dadosDistribuicao.receitasPagasAtraso || 0 },
                { name: 'Despesas Pagas no Prazo', y: dadosDistribuicao.despesasPagasPrazo || 0 },
                { name: 'Receitas Pagas no Prazo', y: dadosDistribuicao.receitasPagasPrazo || 0 }
            ],
            type: 'pie'
        }]
    };

    const lineOptionsReceitasDespesasPagas = {
        chart: {
            width: 800,
            height: 300 
        },
        title: {
            text: 'Receitas Pagas vs Despesas Pagas em 2024'
        },
        xAxis: {
            categories: meses
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false 
        },
        series: [
            {
                name: 'Receitas Pagas',
                data: receitasPagasPorMes,  
                type: 'line',
                color: '#2caffe'
            },
            {
                name: 'Despesas Pagas',
                data: despesasPagasPorMes,  
                type: 'line',
                color: '#00e272'
            }
        ]
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
                        options={pieDespesasReceitasPagasAno}
                    />
                </div>
                {!todosZeros && ( 
                    <div className="chart-container">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={lineOptionsReceitasDespesasPagas}  
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
