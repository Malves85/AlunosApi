using AlunosApi.Models;
using AlunosApi.Services;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
    public class AppDbContext : DbContext
    {
       
        public DbSet<Aluno> Alunos { get; set; } = null;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = AlunoApi; Integrated Security = True;");
        }
        
    }
}
