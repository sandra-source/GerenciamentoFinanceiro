using GerenciamentoFinanceiro.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoFinanceiro.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("receitas-despesas-por-mes")]
        public async Task<IActionResult> ObterReceitasDespesasPorMes()
        {
            var receitasDespesas = await _dashboardService.ObterReceitasDespesasPorMes();
            return Ok(receitasDespesas);
        }
    }
}
