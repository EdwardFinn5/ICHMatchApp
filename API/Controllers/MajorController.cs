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
    public class MajorController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public MajorController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MajorDto>>> GetMajors()
        {
            var majors = await _unitOfWork.MajorRepository.GetMajorDtosAsync();

            return Ok(majors);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<MajorDto>>> GetById(int id)
        {
            var majors = await _unitOfWork.MajorRepository.GetMajorDtosAsync(id);

            return Ok(majors);

        }

        [HttpGet("GetMajorById/{id}")] //this is the one I just added
        public async Task<ActionResult<Major>> GetMajorById(int id)
        {
            return await _unitOfWork.MajorRepository.GetMajorByIdAsync(id);
        }

        [HttpGet("GetMajorDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<MajorDto>> GetMajorDtoById(int id)
        {
            return await _unitOfWork.MajorRepository.GetMajorDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<MajorDto>> AddMajor(AddMajorDto addMajorDto, int id)
        {
            if (await MajorExists(addMajorDto.MajorName)) return BadRequest("Major is already included -- perhaps in another major-category");

            var major = new Major
            {
                // CategoryId = categoryDto.CategoryId,
                MajorName = addMajorDto.MajorName,
                CategoryId = id
            };

            _context.Majors.Add(major);
            await _context.SaveChangesAsync();

            return new MajorDto
            {
                MajorId = major.MajorId,
                MajorName = major.MajorName,
                CategoryId = major.CategoryId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMajor(int id)
        {
            var major = await _unitOfWork.MajorRepository.GetMajorByIdAsync(id);

            _unitOfWork.MajorRepository.DeleteMajor(major);

            if (await _unitOfWork.MajorRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the major");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMajor(MajorUpdateDto majorUpdateDto, int id)
        {
            var major = await _unitOfWork.MajorRepository.GetMajorByIdAsync(id);

            _mapper.Map(majorUpdateDto, major);

            _unitOfWork.MajorRepository.Update(major);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update major");
        }


        private async Task<bool> MajorExists(string majorname)
        {
            return await _context.Majors.AnyAsync(x => x.MajorName == majorname.ToLower());
        }


    }
}