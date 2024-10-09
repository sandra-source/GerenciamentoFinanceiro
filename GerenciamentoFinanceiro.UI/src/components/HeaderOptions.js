import React from 'react';

const HeaderOptions = () => {
  return (
    <div className="header-options">
      <button onClick={() => alert('Adicionar Receita')}>Adicionar Receita</button>
      <button onClick={() => alert('Adicionar Despesa')}>Adicionar Despesa</button>
      <button onClick={() => alert('Relatório Gerado!')}>Gerar Relatório</button>
      <button onClick={() => alert('Logout realizado!')}>Logout</button>
    </div>
  );
};

export default HeaderOptions;
