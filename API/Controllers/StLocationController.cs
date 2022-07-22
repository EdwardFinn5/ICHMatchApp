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
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public StLocationController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StLocationDto>>> GetStLocations()
        {
            var stLocations = await _unitOfWork.StLocationRepository.GetStLocationDtosAsync();

            return Ok(stLocations);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<StLocationDto>>> GetById(int id)
        {
            var stLocations = await _unitOfWork.StLocationRepository.GetStLocationDtosAsync(id);

            return Ok(stLocations);

        }

        [HttpGet("GetStLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<StLocation>> GetStLocationById(int id)
        {
            return await _unitOfWork.StLocationRepository.GetStLocationByIdAsync(id);
        }

        [HttpGet("GetStLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<StLocationDto>> GetStLocationDtoById(int id)
        {
            return await _unitOfWork.StLocationRepository.GetStLocationDtoByIdAsync(id);
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
            var stLocation = await _unitOfWork.StLocationRepository.GetStLocationByIdAsync(id);

            _unitOfWork.StLocationRepository.DeleteStLocation(stLocation);

            if (await _unitOfWork.StLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting state");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStLocation(StLocationUpdateDto stLocationUpdateDto, int id)
        {
            var stLocation = await _unitOfWork.StLocationRepository.GetStLocationByIdAsync(id);

            _mapper.Map(stLocationUpdateDto, stLocation);

            _unitOfWork.StLocationRepository.Update(stLocation);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update state");
        }


        private async Task<bool> StLocationExists(string stLocationName)
        {
            return await _context.StLocations.AnyAsync(x => x.StLocationName == stLocationName.ToLower());
        }
    }
}