using AlunosApi.Models;

namespace AlunosApi.Services
{
    public interface IAlunoService
    {
        Task<IEnumerable<Aluno>> GetAlunos();
        Task<Aluno> GetAlunoById(int id);
        Task<IEnumerable<Aluno>> GetAlunoByName(string name);
        Task CreateAluno(Aluno aluno);
        Task UpdateAluno(Aluno aluno);
        Task DeleteAlunoById(Aluno aluno);

    }
}
