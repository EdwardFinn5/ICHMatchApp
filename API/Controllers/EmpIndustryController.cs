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
    public class EmpIndustryController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IEmpIndustryRepository _empIndustryRepository;
        private readonly IMapper _mapper;
        public EmpIndustryController(DataContext context, IEmpIndustryRepository empIndustryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _empIndustryRepository = empIndustryRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<EmpIndustryDto>> AddEmpIndustry(EmpIndustryDto empIndustryDto)
        {
            if (await EmpIndustryExists(empIndustryDto.EmpIndustryName)) return BadRequest("This industry already exists");

            var empIndustry = new EmpIndustry
            {
                EmpIndustryName = empIndustryDto.EmpIndustryName.ToLower()
            };

            _context.EmpIndustries.Add(empIndustry);
            await _context.SaveChangesAsync();

            return new EmpIndustryDto
            {
                EmpIndustryId = empIndustry.EmpIndustryId,
                EmpIndustryName = empIndustry.EmpIndustryName
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpIndustryDto>>> GetEmpIndustries()
        {
            var empIndustries = await _empIndustryRepository.GetEmpIndustriesAsync();

            return Ok(empIndustries);
        }

        [HttpGet("GetEmpIndustryById/{id}")] //this is the one I just added
        public async Task<ActionResult<EmpIndustry>> GetEmpIndustryByIdAsync(int id)
        {
            return await _empIndustryRepository.GetEmpIndustryByIdAsync(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpIndustryDto>> GetEmpIndustryDtoById(int id)
        {
            return await _empIndustryRepository.GetEmpIndustryDtoByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmpIndustry(EmpIndustryUpdateDto empIndustryUpdateDto, int id)
        {
            var empIndustry = await _empIndustryRepository.GetEmpIndustryByIdAsync(id);

            _mapper.Map(empIndustryUpdateDto, empIndustry);

            _empIndustryRepository.Update(empIndustry);

            if (await _empIndustryRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update industry");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmpIndustry(int id)
        {
            var empIndustry = await _empIndustryRepository.GetEmpIndustryByIdAsync(id);

            _empIndustryRepository.DeleteEmpIndustry(empIndustry);

            if (await _empIndustryRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the industry");

        }
        private async Task<bool> EmpIndustryExists(string empIndustryname)
        {
            return await _context.EmpIndustries.AnyAsync(x => x.EmpIndustryName == empIndustryname.ToLower());
        }
    }
}
