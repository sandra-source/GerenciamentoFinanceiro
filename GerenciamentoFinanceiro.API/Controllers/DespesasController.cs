using GerenciamentoFinanceiro.Domain.Entities;
using GerenciamentoFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GerenciamentoFinanceiro.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DespesasController : ControllerBase
    {
        private readonly IDespesaRepository _despesaRepository;

        public DespesasController(IDespesaRepository despesaRepository)
        {
            _despesaRepository = despesaRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Despesa>> GetAll()
        {
            return await _despesaRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Despesa>> GetById(int id)
        {
            var despesa = await _despesaRepository.GetById(id);
            if (despesa == null)
            {
                return NotFound();
            }

            return Ok(despesa);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Despesa despesa)
        {
            await _despesaRepository.Add(despesa);
            return CreatedAtAction(nameof(GetById), new { id = despesa.Id }, despesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Despesa despesa)
        {
            if (id != despesa.Id)
            {
                return BadRequest();
            }

            await _despesaRepository.Update(despesa);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _despesaRepository.Delete(id);
            return NoContent();
        }
    }
}
