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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CiLocationController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CiLocationDto>>> GetCiLocations()
        {
            var ciLocations = await _unitOfWork.CiLocationRepository.GetCiLocationDtosAsync();

            return Ok(ciLocations);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<CiLocationDto>>> GetById(int id)
        {
            var ciLocations = await _unitOfWork.CiLocationRepository.GetCiLocationDtosAsync(id);

            return Ok(ciLocations);

        }

        [HttpGet("GetCiLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiLocation>> GetCiLocationById(int id)
        {
            return await _unitOfWork.CiLocationRepository.GetCiLocationByIdAsync(id);
        }

        [HttpGet("GetCiLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiLocationDto>> GetCiLocationDtoById(int id)
        {
            return await _unitOfWork.CiLocationRepository.GetCiLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<CiLocationDto>> AddCiLocation(AddCiLocationDto addCiLocationDto, int id)
        {
            if (await CiLocationExists(addCiLocationDto.CiLocationName)) return BadRequest("City has already been added");

            if (addCiLocationDto.CiLocationSortName == null)
            {
                addCiLocationDto.CiLocationSortName = addCiLocationDto.CiLocationName;
            }

            var ciLocation = new CiLocation
            {
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
            var ciLocation = await _unitOfWork.CiLocationRepository.GetCiLocationByIdAsync(id);

            _unitOfWork.CiLocationRepository.DeleteCiLocation(ciLocation);

            if (await _unitOfWork.CiLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting city");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCiLocation(CiLocationUpdateDto ciLocationUpdateDto, int id)
        {
            var ciLocation = await _unitOfWork.CiLocationRepository.GetCiLocationByIdAsync(id);

            _mapper.Map(ciLocationUpdateDto, ciLocation);

            _unitOfWork.CiLocationRepository.Update(ciLocation);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update city");
        }


        private async Task<bool> CiLocationExists(string ciLocationName)
        {
            return await _context.CiLocations.AnyAsync(x => x.CiLocationName == ciLocationName.ToLower());
        }
    }
}