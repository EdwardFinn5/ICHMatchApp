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
    public class LocationController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public LocationController(DataContext context, ILocationRepository locationRepository, IMapper mapper)
        {
            _mapper = mapper;
            _locationRepository = locationRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<LocationDto>> AddLocation(LocationDto locationDto)
        {
            if (await LocationExists(locationDto.LocationName)) return BadRequest("Location is already in place");

            var location = new Location
            {
                // CategoryId = categoryDto.CategoryId,
                LocationName = locationDto.LocationName,
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return new LocationDto
            {
                LocationId = location.LocationId,
                LocationName = location.LocationName
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
        {
            var locations = await _locationRepository.GetLocationsAsync();

            return Ok(locations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocationDto>> GetLocationById(int id)
        {
            return await _locationRepository.GetLocationDtoByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLocation(LocationUpdateDto locationUpdateDto, int id)
        {
            var location = await _locationRepository.GetLocationByIdAsync(id);

            _mapper.Map(locationUpdateDto, location);

            _locationRepository.Update(location);

            if (await _locationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update location");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLocation(int id)
        {
            var location = await _locationRepository.GetLocationByIdAsync(id);

            _locationRepository.DeleteLocation(location);

            if (await _locationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the location");

        }
        private async Task<bool> LocationExists(string locationname)
        {
            return await _context.Locations.AnyAsync(x => x.LocationName == locationname.ToLower());
        }

    }
}