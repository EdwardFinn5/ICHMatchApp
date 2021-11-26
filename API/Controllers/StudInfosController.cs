using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class StudInfosController : BaseApiController
    {
        private readonly IStudInfoRepository _studInfoRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public StudInfosController(IStudInfoRepository studInfoRepository, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _studInfoRepository = studInfoRepository;
        }

        [HttpPost("AddStudInfo")]
        public async Task<ActionResult<StudInfoDto>> AddStudInfo(AddStudInfoDto addStudInfoDto)
        {
            if (await StudInfoExists(addStudInfoDto.Studinfoname)) return BadRequest("Student Info name is taken");

            // var colUser = _mapper.Map<ColUser>(hsRegisterDto);

            var studInfo = new StudInfo
            {
                StudInfoName = addStudInfoDto.Studinfoname.ToLower(),
                Arts = addStudInfoDto.Arts,
                AppUserId = 3
            };

            _context.StudInfos.Add(studInfo);
            await _context.SaveChangesAsync();

            return new StudInfoDto
            {
                // AppUserId = 3,
                Studinfoname = studInfo.StudInfoName,
                Arts = studInfo.Arts,
            };
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudInfoDto>>> GetStudInfos()
        {
            var studInfos = await _studInfoRepository.GetStudInfoDtosAsync();

            return Ok(studInfos);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudInfoDto>> GetStudInfo(int id)
        {
            return await _studInfoRepository.GetStudInfoDtoAsync(id);

        }


        // [HttpPut]
        // public async Task<ActionResult> UpdateStudInfo(StudInfoUpdateDto studInfoUpdateDto)
        // {
        //     var studinfoname = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //     var studInfo = await _studInfoRepository.GetStudInfoByUsernameAsync(studinfoname);

        //     _mapper.Map(studInfoUpdateDto, studInfo);

        //     _studInfoRepository.Update(studInfo);

        //     if (await _studInfoRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update user");
        // }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudInfo(StudInfoUpdateDto studInfoUpdateDto, int id)
        {
            var studInfo = await _studInfoRepository.GetStudInfoByIdAsync(id);

            _mapper.Map(studInfoUpdateDto, studInfo);

            _studInfoRepository.Update(studInfo);

            if (await _studInfoRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        private async Task<bool> StudInfoExists(string Studinfoname)
        {
            return await _context.StudInfos.AnyAsync(x => x.StudInfoName == Studinfoname.ToLower());
        }
    }
}