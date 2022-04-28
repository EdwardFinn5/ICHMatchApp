using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CoLocationController : BaseApiController
    {
        private readonly ICoLocationRepository _coLocationRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CoLocationController(ICoLocationRepository coLocationRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _coLocationRepository = coLocationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoLocationDto>>> GetCoLocations()
        {
            var coLocations = await _coLocationRepository.GetCoLocationDtosAsync();

            return Ok(coLocations);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        // [HttpGet("GetById/{id}")]
        // public async Task<ActionResult<IEnumerable<CoLocationDto>>> GetById(int id)
        // {
        //     var coLocations = await _coLocationRepository.GetCoLocationDtosAsync(id);

        //     return Ok(coLocations);

        // }

        [HttpGet("GetCoLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<CoLocation>> GetCoLocationById(int id)
        {
            return await _coLocationRepository.GetCoLocationByIdAsync(id);
        }

        [HttpGet("GetCoLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<CoLocationDto>> GetCoLocationDtoById(int id)
        {
            return await _coLocationRepository.GetCoLocationDtoByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<CoLocationDto>> AddCoLocation(AddCoLocationDto addCoLocationDto)
        {
            if (await CoLocationExists(addCoLocationDto.CoLocationName)) return BadRequest("Country has already been added");

            var coLocation = new CoLocation
            {
                // CategoryId = categoryDto.CategoryId,
                CoLocationName = addCoLocationDto.CoLocationName,
                CoLocationSortName = addCoLocationDto.CoLocationSortName
            };

            _context.CoLocations.Add(coLocation);
            await _context.SaveChangesAsync();

            return new CoLocationDto
            {
                CoLocationId = coLocation.CoLocationId,
                CoLocationName = coLocation.CoLocationName,
                CoLocationSortName = coLocation.CoLocationSortName,
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCoLocation(int id)
        {
            var coLocation = await _coLocationRepository.GetCoLocationByIdAsync(id);

            _coLocationRepository.DeleteCoLocation(coLocation);

            if (await _coLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting country");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCoLocation(CoLocationUpdateDto coLocationUpdateDto, int id)
        {
            var coLocation = await _coLocationRepository.GetCoLocationByIdAsync(id);

            _mapper.Map(coLocationUpdateDto, coLocation);

            _coLocationRepository.Update(coLocation);

            if (await _coLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update country");
        }


        private async Task<bool> CoLocationExists(string coLocationName)
        {
            return await _context.CoLocations.AnyAsync(x => x.CoLocationName == coLocationName.ToLower());
        }
    }
}
