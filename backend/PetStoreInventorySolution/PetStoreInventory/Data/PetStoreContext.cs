

using Microsoft.EntityFrameworkCore;
using PetStoreInventory.Models;

namespace PetStoreInventory.Data
{
    public class PetStoreContext : DbContext
    {
        public PetStoreContext(DbContextOptions options) : base(options)
        { 
        }
        public DbSet<PetDetails> PetStore { get; set; }
       
    }

}