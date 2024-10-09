using GerenciamentoFinanceiro.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoFinanceiro.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioService _relatorioService;

        public RelatorioController(RelatorioService relatorioService)
        {
            _relatorioService = relatorioService;
        }

        [HttpGet("gerar")]
        public async Task<IActionResult> GerarRelatorio(DateTime dataInicio, DateTime dataFim, string categoria = null)
        {
            var relatorio = await _relatorioService.GerarRelatorioAsync(dataInicio, dataFim, categoria);
            return Ok(relatorio);
        }
    }
}
