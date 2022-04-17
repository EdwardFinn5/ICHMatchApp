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
        private readonly ICollegeRepository _collegeRepository;
        private readonly IMapper _mapper;
        public CollegesController(DataContext context, ICollegeRepository collegeRepository, IMapper mapper)
        {
            _mapper = mapper;
            _collegeRepository = collegeRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<CollegeDto>> AddCollege(CollegeDto collegeDto)
        {
            if (await CollegeExists(collegeDto.CollegeName)) return BadRequest("College is already in place");

            var college = new College
            {
                // CategoryId = categoryDto.CategoryId,
                CollegeName = collegeDto.CollegeName.ToLower(),
                CollegeNickname = collegeDto.CollegeNickname.ToLower(),
            };

            _context.Colleges.Add(college);
            await _context.SaveChangesAsync();

            return new CollegeDto
            {
                CollegeId = college.CollegeId,
                CollegeName = college.CollegeName
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollegeDto>>> GetColleges()
        {
            var colleges = await _collegeRepository.GetCollegesAsync();

            return Ok(colleges);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CollegeDto>> GetCollegeDtoById(int id)
        {
            return await _collegeRepository.GetCollegeDtoByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCollege(CollegeUpdateDto collegeUpdateDto, int id)
        {
            var college = await _collegeRepository.GetCollegeByIdAsync(id);

            _mapper.Map(collegeUpdateDto, college);

            _collegeRepository.Update(college);

            if (await _collegeRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update college");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCollege(int id)
        {
            var college = await _collegeRepository.GetCollegeByIdAsync(id);

            _collegeRepository.DeleteCollege(college);

            if (await _collegeRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the college");

        }
        private async Task<bool> CollegeExists(string collegename)
        {
            return await _context.Colleges.AnyAsync(x => x.CollegeName == collegename.ToLower());
        }
    }
}