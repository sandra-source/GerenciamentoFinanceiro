﻿using GerenciamentoFinanceiro.Application.DTOs;
using GerenciamentoFinanceiro.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoFinanceiro.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;

        public TransacaoController(ITransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpGet]
        [HttpGet]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransacaoDTO>>> ObterTransacoes(
        string ordenacaoValor = null,
        string ordenacaoData = null,
        string categoria = null,
        string status = null,
        int? tipo = null,
        DateTime? dataInicio = null, 
        DateTime? dataFim = null    
)
        {
            var transacoes = await _transacaoService.ObterTransacoes(ordenacaoValor, ordenacaoData, categoria, status, tipo, dataInicio, dataFim);
            return Ok(transacoes);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<TransacaoDTO>> ObterTransacaoPorId(int id)
        {
            var transacao = await _transacaoService.ObterPorId(id);
            if (transacao == null)
            {
                return NotFound();
            }

            return Ok(transacao);
        }

        [HttpPost]
        public async Task<IActionResult> AdicionarTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            await _transacaoService.AdicionarTransacao(transacaoDTO);
            return CreatedAtAction(nameof(ObterTransacaoPorId), new { id = transacaoDTO.Id }, transacaoDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarTransacao(int id, [FromBody] TransacaoDTO transacaoDTO)
        {
            if (id != transacaoDTO.Id)
            {
                return BadRequest();
            }

            await _transacaoService.AtualizarTransacao(transacaoDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverTransacao(int id)
        {
            await _transacaoService.RemoverTransacao(id);
            return NoContent();
        }
    }
}
