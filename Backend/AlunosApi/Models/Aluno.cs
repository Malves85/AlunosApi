using System.ComponentModel.DataAnnotations;

namespace AlunosApi.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }
        [Required]
        public int Age { get; set; }
    }
}
