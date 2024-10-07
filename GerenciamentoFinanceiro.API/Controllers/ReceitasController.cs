using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceitasController : ControllerBase
    {
        private readonly IReceitaRepository _receitaRepository;

        public ReceitasController(IReceitaRepository receitaRepository)
        {
            _receitaRepository = receitaRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Receita>> GetAll()
        {
            return await _receitaRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Receita>> GetById(int id)
        {
            var receita = await _receitaRepository.GetById(id);
            if (receita == null)
            {
                return NotFound();
            }

            return Ok(receita);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Receita receita)
        {
            await _receitaRepository.Add(receita);
            return CreatedAtAction(nameof(GetById), new { id = receita.Id }, receita);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Receita receita)
        {
            if (id != receita.Id)
            {
                return BadRequest();
            }

            await _receitaRepository.Update(receita);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _receitaRepository.Delete(id);
            return NoContent();
        }
    }
}
