using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetStoreInventory.Data;
using PetStoreInventory.Models;

namespace PetStoreInventory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetStoreController : ControllerBase
    {
        private readonly PetStoreContext _context;

        public PetStoreController(PetStoreContext context)
        {
            _context = context;
        }

        // GET: api/PetStore
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetStore>>> GetPetStore()
        {
            return await _context.PetStore.ToListAsync();
        }

        // GET: api/PetStore/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PetStore>> GetPetStore(int id)
        {
            var petStore = await _context.PetStore.FindAsync(id);

            if (petStore == null)
            {
                return NotFound();
            }

            return petStore;
        }

        // PUT: api/PetStore/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPetStore(int id, PetStore petStore)
        {
            if (id != petStore.Id)
            {
                return BadRequest();
            }

            _context.Entry(petStore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetStoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PetStore
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PetStore>> PostPetStore(PetStore petStore)
        {
            _context.PetStore.Add(petStore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPetStore", new { id = petStore.Id }, petStore);
        }

        // DELETE: api/PetStore/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePetStore(int id)
        {
            var petStore = await _context.PetStore.FindAsync(id);
            if (petStore == null)
            {
                return NotFound();
            }

            _context.PetStore.Remove(petStore);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PetStoreExists(int id)
        {
            return _context.PetStore.Any(e => e.Id == id);
        }
    }
}
