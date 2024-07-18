using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetStoreInventory.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PetStore",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Naam = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Diersoort = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Leeftijd = table.Column<int>(type: "int", nullable: false),
                    Prijs = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Geslacht = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    Locatie = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Ras = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Kleur = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Gewicht = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Vaccinatiestatus = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Chipnummer = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Gezondheidsstatus = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Voeding = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Gedrag = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    DatumVanBinnenkomst = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Verkoopstatus = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Contactpersoon = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Beschrijving = table.Column<string>(type: "nvarchar(500)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetStore", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetStore");
        }
    }
}
