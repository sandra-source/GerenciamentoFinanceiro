using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using GerenciamentoFinanceiro.Application.Services;
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
    public class ReceitaController : ControllerBase
    {
        private readonly IReceitaService _receitaService;

        public ReceitaController(IReceitaService receitaService)
        {
            _receitaService = receitaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DespesaDTO>>> ObterReceitas(
            string ordenacaoValor = null,
            string ordenacaoDataRecebimento = null,
            string categoria = null,
            string status = null)
        {
            var despesas = await _receitaService.ObterReceitas(ordenacaoValor, ordenacaoDataRecebimento, categoria, status);
            return Ok(despesas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReceitaDTO>> GetById(int id)
        {
            var receita = await _receitaService.ObterPorId(id);
            if (receita == null)
            {
                return NotFound();
            }

            return Ok(receita);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ReceitaDTO receitaDTO)
        {
            await _receitaService.AdicionarReceita(receitaDTO);
            return CreatedAtAction(nameof(GetById), new { id = receitaDTO.Id }, receitaDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ReceitaDTO receitaDTO)
        {
            if (id != receitaDTO.Id)
            {
                return BadRequest();
            }

            await _receitaService.AtualizarReceita(receitaDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _receitaService.RemoverReceita(id);
            return NoContent();
        }
    }
}
