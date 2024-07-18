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
    public class PetDetailsController : ControllerBase
    {
        private readonly PetStoreContext _context;

        public PetDetailsController(PetStoreContext context)
        {
            _context = context;
        }

        // GET: api/PetDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PetDetails>>> GetPetStore()
        {
            return await _context.PetStore.ToListAsync();
        }

        // GET: api/PetDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PetDetails>> GetPetDetails(string id)
        {
            var petDetails = await _context.PetStore.FindAsync(id);

            if (petDetails == null)
            {
                return NotFound();
            }

            return petDetails;
        }

        // PUT: api/PetDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPetDetails(string id, PetDetails petDetails)
        {
            if (id != petDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(petDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetDetailsExists(id))
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

        // POST: api/PetDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PetDetails>> PostPetDetails(PetDetails petDetails)
        {
            _context.PetStore.Add(petDetails);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PetDetailsExists(petDetails.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPetDetails", new { id = petDetails.Id }, petDetails);
        }

        // DELETE: api/PetDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePetDetails(string id)
        {
            var petDetails = await _context.PetStore.FindAsync(id);
            if (petDetails == null)
            {
                return NotFound();
            }

            _context.PetStore.Remove(petDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PetDetailsExists(string id)
        {
            return _context.PetStore.Any(e => e.Id == id);
        }
    }
}
