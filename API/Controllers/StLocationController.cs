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
    public class StLocationController : BaseApiController
    {
        private readonly IStLocationRepository _stLocationRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public StLocationController(IStLocationRepository stLocationRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _stLocationRepository = stLocationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StLocationDto>>> GetStLocations()
        {
            var stLocations = await _stLocationRepository.GetStLocationDtosAsync();

            return Ok(stLocations);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<StLocationDto>>> GetById(int id)
        {
            var stLocations = await _stLocationRepository.GetStLocationDtosAsync(id);

            return Ok(stLocations);

        }

        [HttpGet("GetStLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<StLocation>> GetStLocationById(int id)
        {
            return await _stLocationRepository.GetStLocationByIdAsync(id);
        }

        [HttpGet("GetStLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<StLocationDto>> GetStLocationDtoById(int id)
        {
            return await _stLocationRepository.GetStLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<StLocationDto>> AddStLocation(AddStLocationDto addStLocationDto, int id)
        {
            if (await StLocationExists(addStLocationDto.StLocationName)) return BadRequest("State has already been added");

            if (addStLocationDto.StLocationSortName == null)
            {
                addStLocationDto.StLocationSortName = addStLocationDto.StLocationName;
            }

            var stLocation = new StLocation
            {
                // CategoryId = categoryDto.CategoryId,
                StLocationName = addStLocationDto.StLocationName,
                StLocationSortName = addStLocationDto.StLocationSortName,
                CoLocationId = id
            };

            _context.StLocations.Add(stLocation);
            await _context.SaveChangesAsync();

            return new StLocationDto
            {
                StLocationId = stLocation.StLocationId,
                StLocationName = stLocation.StLocationName,
                StLocationSortName = stLocation.StLocationSortName,
                CoLocationId = stLocation.CoLocationId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStLocation(int id)
        {
            var stLocation = await _stLocationRepository.GetStLocationByIdAsync(id);

            _stLocationRepository.DeleteStLocation(stLocation);

            if (await _stLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting state");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStLocation(StLocationUpdateDto stLocationUpdateDto, int id)
        {
            var stLocation = await _stLocationRepository.GetStLocationByIdAsync(id);

            _mapper.Map(stLocationUpdateDto, stLocation);

            _stLocationRepository.Update(stLocation);

            if (await _stLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update state");
        }


        private async Task<bool> StLocationExists(string stLocationName)
        {
            return await _context.StLocations.AnyAsync(x => x.StLocationName == stLocationName.ToLower());
        }
    }
}