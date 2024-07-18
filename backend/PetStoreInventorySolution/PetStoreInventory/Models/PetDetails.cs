using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetStoreInventory.Models
{
    public class PetDetails
    {
        [Key]
        public string Id { get; set; } = "";

        [Required(ErrorMessage = "Naam is verplicht")]
        [Column(TypeName = "nvarchar(50)")]
        public string Naam { get; set; } = "";

        [Required(ErrorMessage = "Diersoort is verplicht")]
        [Column(TypeName = "nvarchar(50)")]
        public string Diersoort { get; set; } = "";

        [Required(ErrorMessage = "Leeftijd is verplicht")]
        [Range(0, int.MaxValue, ErrorMessage = "Leeftijd moet een positief getal zijn")]
        public int Leeftijd { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Prijs { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Geslacht { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Locatie { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Ras { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Kleur { get; set; } = "";

        [Column(TypeName = "decimal(10,2)")]
        public decimal Gewicht { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Vaccinatiestatus { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Chipnummer { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Gezondheidsstatus { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Voeding { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Gedrag { get; set; } = "";

        public DateTime? DatumVanBinnenkomst { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Verkoopstatus { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Contactpersoon { get; set; } = "";

        [Column(TypeName = "nvarchar(500)")]
        public string Beschrijving { get; set; } = "";
    }
}