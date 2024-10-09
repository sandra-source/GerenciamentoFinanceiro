using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DespesaController : ControllerBase
    {
        private readonly IDespesaService _despesaService;

        public DespesaController(IDespesaService despesaService)
        {
            _despesaService = despesaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DespesaDTO>>> ObterTodasDespesas()
        {
            var despesas = await _despesaService.ObterTodasDespesas();
            return Ok(despesas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DespesaDTO>> ObterDespesaPorId(int id)
        {
            var despesa = await _despesaService.ObterPorId(id);
            if (despesa == null)
            {
                return NotFound();
            }

            return Ok(despesa);
        }

        [HttpPost]
        public async Task<IActionResult> AdicionarDespesa([FromBody] DespesaDTO despesaDTO)
        {
            await _despesaService.AdicionarDespesa(despesaDTO);
            return CreatedAtAction(nameof(ObterDespesaPorId), new { id = despesaDTO.Id }, despesaDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarDespesa(int id, [FromBody] DespesaDTO despesaDTO)
        {
            if (id != despesaDTO.Id)
            {
                return BadRequest();
            }

            await _despesaService.AtualizarDespesa(despesaDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverDespesa(int id)
        {
            await _despesaService.RemoverDespesa(id);
            return NoContent();
        }
    }
}
