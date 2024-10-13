using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("receitas-despesas-por-mes")]
        public async Task<ActionResult<IEnumerable<ReceitaDespesaPorMesDTO>>> ObterReceitasDespesasPorMes()
        {
            var receitasDespesas = await _dashboardService.ObterReceitasDespesasPorMes();
            return Ok(receitasDespesas);
        }

        [HttpGet("distribuicao-receitas-despesas")]
        public async Task<ActionResult<DistribuicaoReceitasDespesas>> ObterDistribuicaoReceitasDespesas()
        {
            var distribuicao = await _dashboardService.ObterDistribuicaoReceitasDespesas();
            return Ok(distribuicao);
        }

        [HttpGet("receitas-despesas-pagas-por-mes")]
        public async Task<ActionResult<ReceitasDespesasPagasPorMes>> ObterReceitasDespesasPagasPorMes()
        {
            var receitasDespesasPagas = await _dashboardService.ObterReceitasDespesasPagasPorMes();
            return Ok(receitasDespesasPagas);
        }

    }
}
