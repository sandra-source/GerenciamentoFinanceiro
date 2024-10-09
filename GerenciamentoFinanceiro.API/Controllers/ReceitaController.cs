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
    public class ReceitaController : ControllerBase
    {
        private readonly IReceitaService _receitaService;

        public ReceitaController(IReceitaService receitaService)
        {
            _receitaService = receitaService;
        }

        [HttpGet]
        public async Task<IEnumerable<ReceitaDTO>> GetAll()
        {
            return await _receitaService.ObterTodasReceitas();
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
