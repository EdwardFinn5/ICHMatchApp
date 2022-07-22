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
    public class CollegesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CollegesController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<CollegeDto>> AddCollege(CollegeDto collegeDto)
        {
            if (await CollegeExists(collegeDto.CollegeName)) return BadRequest("College is already in place");

            var college = new College
            {
                CollegeName = collegeDto.CollegeName.ToLower(),
                CollegeNickname = collegeDto.CollegeNickname.ToLower(),
            };

            _context.Colleges.Add(college);
            await _context.SaveChangesAsync();

            return new CollegeDto
            {
                CollegeId = college.CollegeId,
                CollegeName = college.CollegeName,
                CollegeNickname = college.CollegeNickname

            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollegeDto>>> GetColleges()
        {
            var colleges = await _unitOfWork.CollegeRepository.GetCollegesAsync();

            return Ok(colleges);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollegeDto>> GetCollegeDtoById(int id)
        {
            return await _unitOfWork.CollegeRepository.GetCollegeDtoByIdAsync(id);
        }

        [HttpGet("GetCollegeById/{id}")] //this is the one I just added
        public async Task<ActionResult<College>> GetCollegeByIdAsync(int id)
        {
            return await _unitOfWork.CollegeRepository.GetCollegeByIdAsync(id);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCollege(CollegeUpdateDto collegeUpdateDto, int id)
        {
            var college = await _unitOfWork.CollegeRepository.GetCollegeByIdAsync(id);

            _mapper.Map(collegeUpdateDto, college);

            _unitOfWork.CollegeRepository.Update(college);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update college");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCollege(int id)
        {
            var college = await _unitOfWork.CollegeRepository.GetCollegeByIdAsync(id);

            _unitOfWork.CollegeRepository.DeleteCollege(college);

            if (await _unitOfWork.CollegeRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the college");

        }
        private async Task<bool> CollegeExists(string collegename)
        {
            return await _context.Colleges.AnyAsync(x => x.CollegeName == collegename.ToLower());
        }
    }
}