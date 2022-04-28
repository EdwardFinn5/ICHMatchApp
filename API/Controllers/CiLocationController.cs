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
    public class CiLocationController : BaseApiController
    {
        private readonly ICiLocationRepository _ciLocationRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CiLocationController(ICiLocationRepository ciLocationRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _ciLocationRepository = ciLocationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CiLocationDto>>> GetCiLocations()
        {
            var ciLocations = await _ciLocationRepository.GetCiLocationDtosAsync();

            return Ok(ciLocations);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetByStLocationId/{id}")]
        public async Task<ActionResult<IEnumerable<CiLocationDto>>> GetByStLocationId(int id)
        {
            var ciLocations = await _ciLocationRepository.GetCiLocationStLocationIdDtosAsync(id);

            return Ok(ciLocations);

        }

        // [HttpGet("GetByOtherCCId/{id}")]
        // public async Task<ActionResult<IEnumerable<CiLocationDto>>> GetByOtherCCId(int id)
        // {
        //     var ciLocations = await _ciLocationRepository.GetCiLocationOtherCCIdDtosAsync(id);

        //     return Ok(ciLocations);

        // }

        [HttpGet("GetCiLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiLocation>> GetCiLocationById(int id)
        {
            return await _ciLocationRepository.GetCiLocationByIdAsync(id);
        }

        [HttpGet("GetCiLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiLocationDto>> GetCiLocationDtoById(int id)
        {
            return await _ciLocationRepository.GetCiLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<CiLocationDto>> AddCiLocation(AddCiLocationDto addCiLocationDto, int id)
        {
            if (await CiLocationExists(addCiLocationDto.CiLocationName)) return BadRequest("City has already been added");

            var ciLocation = new CiLocation
            {
                // CategoryId = categoryDto.CategoryId,
                CiLocationName = addCiLocationDto.CiLocationName,
                CiLocationSortName = addCiLocationDto.CiLocationSortName,
                StLocationId = id
            };

            _context.CiLocations.Add(ciLocation);
            await _context.SaveChangesAsync();

            return new CiLocationDto
            {
                CiLocationId = ciLocation.CiLocationId,
                CiLocationName = ciLocation.CiLocationName,
                CiLocationSortName = ciLocation.CiLocationSortName,
                StLocationId = ciLocation.StLocationId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCiLocation(int id)
        {
            var ciLocation = await _ciLocationRepository.GetCiLocationByIdAsync(id);

            _ciLocationRepository.DeleteCiLocation(ciLocation);

            if (await _ciLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting city");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCiLocation(CiLocationUpdateDto ciLocationUpdateDto, int id)
        {
            var ciLocation = await _ciLocationRepository.GetCiLocationByIdAsync(id);

            _mapper.Map(ciLocationUpdateDto, ciLocation);

            _ciLocationRepository.Update(ciLocation);

            if (await _ciLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update city");
        }


        private async Task<bool> CiLocationExists(string ciLocationName)
        {
            return await _context.CiLocations.AnyAsync(x => x.CiLocationName == ciLocationName.ToLower());
        }
    }
}