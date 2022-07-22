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
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public StempLocationController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StempLocationDto>>> GetStempLocations()
        {
            var stempLocations = await _unitOfWork.StempLocationRepository.GetStempLocationDtosAsync();

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
            return await _unitOfWork.StempLocationRepository.GetStempLocationByIdAsync(id);
        }

        [HttpGet("GetStempLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<StempLocationDto>> GetStempLocationDtoById(int id)
        {
            return await _unitOfWork.StempLocationRepository.GetStempLocationDtoByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<StempLocationDto>> AddStempLocation(AddStempLocationDto addStempLocationDto, int id)
        {
            if (await StempLocationExists(addStempLocationDto.StempLocationName)) return BadRequest("State has already been added");

            if (addStempLocationDto.StempLocationSortName == null)
            {
                addStempLocationDto.StempLocationSortName = addStempLocationDto.StempLocationName;
            }

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
            var stempLocation = await _unitOfWork.StempLocationRepository.GetStempLocationByIdAsync(id);

            _unitOfWork.StempLocationRepository.DeleteStempLocation(stempLocation);

            if (await _unitOfWork.StempLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting state");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStempLocation(StempLocationUpdateDto stempLocationUpdateDto, int id)
        {
            var stempLocation = await _unitOfWork.StempLocationRepository.GetStempLocationByIdAsync(id);

            _mapper.Map(stempLocationUpdateDto, stempLocation);

            _unitOfWork.StempLocationRepository.Update(stempLocation);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update state");
        }


        private async Task<bool> StempLocationExists(string stempLocationName)
        {
            return await _context.StempLocations.AnyAsync(x => x.StempLocationName == stempLocationName.ToLower());
        }
    }
}