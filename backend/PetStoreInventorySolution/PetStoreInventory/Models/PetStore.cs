using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetStoreInventory.Models
{
    public class PetStore
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Naam { get; set; } = "";
        [Column(TypeName = "nvarchar(20)")]
        public string Diersoort { get; set; } = "";
        [Column(TypeName = "int")]
        public int Leeftijd { get; set; } = 0;
        [Column(TypeName = "decimal(10,2)")]
        public decimal Prijs { get; set; } = 0;
        [Column(TypeName = "nvarchar(20)")]
        public string Geslacht { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string Beschrijven { get; set; } = "";
    }
}