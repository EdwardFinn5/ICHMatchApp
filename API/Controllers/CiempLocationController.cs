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
    public class CiempLocationController : BaseApiController
    {
        private readonly ICiempLocationRepository _ciempLocationRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CiempLocationController(ICiempLocationRepository ciempLocationRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _ciempLocationRepository = ciempLocationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CiempLocationDto>>> GetCiempLocations()
        {
            var ciempLocations = await _ciempLocationRepository.GetCiempLocationDtosAsync();

            return Ok(ciempLocations);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<CiempLocationDto>>> GetById(int id)
        {
            var ciempLocations = await _ciempLocationRepository.GetCiempLocationDtosAsync(id);

            return Ok(ciempLocations);

        }

        [HttpGet("GetCiempLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiempLocation>> GetCiempLocationById(int id)
        {
            return await _ciempLocationRepository.GetCiempLocationByIdAsync(id);
        }

        [HttpGet("GetCiempLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiempLocationDto>> GetCiempLocationDtoById(int id)
        {
            return await _ciempLocationRepository.GetCiempLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<CiempLocationDto>> AddCiempLocation(AddCiempLocationDto addCiempLocationDto, int id)
        {
            if (await CiempLocationExists(addCiempLocationDto.CiempLocationName)) return BadRequest("City has already been added");

            var ciempLocation = new CiempLocation
            {
                CiempLocationName = addCiempLocationDto.CiempLocationName,
                CiempLocationSortName = addCiempLocationDto.CiempLocationSortName,
                StempLocationId = id
            };

            _context.CiempLocations.Add(ciempLocation);
            await _context.SaveChangesAsync();

            return new CiempLocationDto
            {
                CiempLocationId = ciempLocation.CiempLocationId,
                CiempLocationName = ciempLocation.CiempLocationName,
                CiempLocationSortName = ciempLocation.CiempLocationSortName,
                StempLocationId = ciempLocation.StempLocationId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCiempLocation(int id)
        {
            var ciempLocation = await _ciempLocationRepository.GetCiempLocationByIdAsync(id);

            _ciempLocationRepository.DeleteCiempLocation(ciempLocation);

            if (await _ciempLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting city");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCiempLocation(CiempLocationUpdateDto ciempLocationUpdateDto, int id)
        {
            var ciempLocation = await _ciempLocationRepository.GetCiempLocationByIdAsync(id);

            _mapper.Map(ciempLocationUpdateDto, ciempLocation);

            _ciempLocationRepository.Update(ciempLocation);

            if (await _ciempLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update city");
        }


        private async Task<bool> CiempLocationExists(string ciempLocationName)
        {
            return await _context.CiempLocations.AnyAsync(x => x.CiempLocationName == ciempLocationName.ToLower());
        }
    }
}