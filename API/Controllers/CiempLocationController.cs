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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public CiempLocationController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CiempLocationDto>>> GetCiempLocations()
        {
            var ciempLocations = await _unitOfWork.CiempLocationRepository.GetCiempLocationDtosAsync();

            return Ok(ciempLocations);
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<CiempLocationDto>>> GetById(int id)
        {
            var ciempLocations = await _unitOfWork.CiempLocationRepository.GetCiempLocationDtosAsync(id);

            return Ok(ciempLocations);

        }

        [HttpGet("GetCiempLocationById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiempLocation>> GetCiempLocationById(int id)
        {
            return await _unitOfWork.CiempLocationRepository.GetCiempLocationByIdAsync(id);
        }

        [HttpGet("GetCiempLocationDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<CiempLocationDto>> GetCiempLocationDtoById(int id)
        {
            return await _unitOfWork.CiempLocationRepository.GetCiempLocationDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<CiempLocationDto>> AddCiempLocation(AddCiempLocationDto addCiempLocationDto, int id)
        {
            if (await CiempLocationExists(addCiempLocationDto.CiempLocationName)) return BadRequest("City has already been added");

            if (addCiempLocationDto.CiempLocationSortName == null)
            {
                addCiempLocationDto.CiempLocationSortName = addCiempLocationDto.CiempLocationName;
            }

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
            var ciempLocation = await _unitOfWork.CiempLocationRepository.GetCiempLocationByIdAsync(id);

            _unitOfWork.CiempLocationRepository.DeleteCiempLocation(ciempLocation);

            if (await _unitOfWork.CiempLocationRepository.Complete()) return Ok();

            return BadRequest("Problem deleting city");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCiempLocation(CiempLocationUpdateDto ciempLocationUpdateDto, int id)
        {
            var ciempLocation = await _unitOfWork.CiempLocationRepository.GetCiempLocationByIdAsync(id);

            _mapper.Map(ciempLocationUpdateDto, ciempLocation);

            _unitOfWork.CiempLocationRepository.Update(ciempLocation);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update city");
        }


        private async Task<bool> CiempLocationExists(string ciempLocationName)
        {
            return await _context.CiempLocations.AnyAsync(x => x.CiempLocationName == ciempLocationName.ToLower());
        }
    }
}