using AlunosApi.Models;
using AlunosApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunoService.GetAlunos();
                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter alunos");
            }
        }
        [HttpGet("ByName")]

        public async Task<ActionResult<IAsyncEnumerable<Aluno>>>
            GetAlunoByName([FromQuery] string name)
        {
            try
            {
                var alunos = await _alunoService.GetAlunoByName(name);
                if (alunos.Count() == 0)
                    return NotFound($"Não existem alunos com o critério {name}");

                return Ok(alunos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Erro ao obter alunos");
            }
        }
        [HttpGet("{id:int}", Name = "GetAlunoById")]

        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunoById(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAlunoById(id);
                if (aluno == null)
                    return NotFound($"Não existem alunos com o id = {id}");

                return Ok(aluno);
            }
            catch
            {
                return BadRequest("Inválid Request");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Aluno aluno)
        {
            try
            {
                await _alunoService.CreateAluno(aluno);
                return CreatedAtRoute(nameof(GetAlunoById), new { id = aluno.Id }, aluno);
            }
            catch
            {

                return BadRequest("Inválid Request");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Aluno aluno)
        {
            try
            {
                if (aluno.Id == id)
                {
                    await _alunoService.UpdateAluno(aluno);
                    return Ok($"Aluno com id = {id} foi atualizado com sucesso");
                    
                }
                else
                {
                    return BadRequest("Dados inválidos");
                }
            }
            catch
            {

                return BadRequest("Inválid Request");
            }
        }

        [HttpDelete ("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAlunoById(id);
                if (aluno != null)
                {
                    await _alunoService.DeleteAlunoById(aluno);
                    return Ok($"Aluno com id = {id} foi excluído com sucesso");

                }
                else
                {
                    return NotFound($"Aluno com id = {id} não foi encontrado");
                }
            }
            catch
            {

                return BadRequest("Inválid Request");
            }
        }

    }
}
