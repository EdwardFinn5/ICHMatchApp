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
    public class StempLocationController : BaseApiController
    {
        private readonly IStempLocationRepository _stempLocationRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public StempLocationController(IStempLocationRepository stempLocationRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _stempLocationRepository = stempLocationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StempLocationDto>>> GetStempLocations()
        {
            var stempLocations = await _stempLocationRepository.GetStempLocationDtosAsync();

            return Ok(stempLocations);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        // [HttpGet("GetById/{id}")]
        // public async Task<ActionResult<IEnumerable<StLocationDto>>> GetById(int id)
        // {
        //     var stLocations = await _stLocationRepository.GetStLocationDtosAsync(id);

        //     return Ok(stLocations);

        // }

        [HttpGet("GetStempLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<StempLocation>> GetStempLocationById(int id)
        {
            return await _stempLocationRepository.GetStempLocationByIdAsync(id);
        }

        [HttpGet("GetStempLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<StempLocationDto>> GetStempLocationDtoById(int id)
        {
            return await _stempLocationRepository.GetStempLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<StempLocationDto>> AddStempLocation(AddStempLocationDto addStempLocationDto, int id)
        {
            if (await StempLocationExists(addStempLocationDto.StempLocationName)) return BadRequest("State has already been added");

            var stempLocation = new StempLocation
            {
                StempLocationName = addStempLocationDto.StempLocationName,
                StempLocationSortName = addStempLocationDto.StempLocationSortName,
            };

            _context.StempLocations.Add(stempLocation);
            await _context.SaveChangesAsync();

            return new StempLocationDto
            {
                StempLocationId = stempLocation.StempLocationId,
                StempLocationName = stempLocation.StempLocationName,
                StempLocationSortName = stempLocation.StempLocationSortName,
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStempLocation(int id)
        {
            var stempLocation = await _stempLocationRepository.GetStempLocationByIdAsync(id);

            _stempLocationRepository.DeleteStempLocation(stempLocation);

            if (await _stempLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting state");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStempLocation(StempLocationUpdateDto stempLocationUpdateDto, int id)
        {
            var stempLocation = await _stempLocationRepository.GetStempLocationByIdAsync(id);

            _mapper.Map(stempLocationUpdateDto, stempLocation);

            _stempLocationRepository.Update(stempLocation);

            if (await _stempLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update state");
        }


        private async Task<bool> StempLocationExists(string stempLocationName)
        {
            return await _context.StempLocations.AnyAsync(x => x.StempLocationName == stempLocationName.ToLower());
        }
    }
}