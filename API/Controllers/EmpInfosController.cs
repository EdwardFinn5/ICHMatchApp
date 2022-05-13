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

namespace API.Controllers
{
    public class EmpInfosController : BaseApiController
    {
        private readonly IEmpInfoRepository _empInfoRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public EmpInfosController(IEmpInfoRepository empInfoRepository, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _empInfoRepository = empInfoRepository;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<EmpInfoDto>> AddEmpInfo(AddEmpInfoDto addEmpInfoDto, int id)
        {

            // if (await StudInfoExists(addStudInfoDto.StudInfoName)) return BadRequest("Student Info name is taken");

            var empInfo = new EmpInfo
            {
                AppUserId = id
            };

            _mapper.Map(empInfo, addEmpInfoDto);

            // var colUser = _mapper.Map<ColUser>(hsRegisterDto);

            // var studInfo = new StudInfo
            // {
            //     StudInfoId = addStudInfoDto.StudInfoId,
            //     StudInfoName = addStudInfoDto.StudInfoName,
            //     GPA = addStudInfoDto.GPA,
            //     GradDate = addStudInfoDto.GradDate,
            //     AcademicPlus = addStudInfoDto.AcademicPlus,
            //     WorkPlus = addStudInfoDto.WorkPlus,
            //     Athletics = addStudInfoDto.Athletics,
            //     Arts = addStudInfoDto.Arts,
            //     ExtraCurricular = addStudInfoDto.ExtraCurricular,
            //     BestEmail = addStudInfoDto.BestEmail,
            //     BestPhone = addStudInfoDto.BestPhone,
            //     DreamJob = addStudInfoDto.DreamJob,
            //     AppUserId = id
            // };

            _context.EmpInfos.Add(empInfo);
            await _context.SaveChangesAsync();



            return new EmpInfoDto
            {
                EmpInfoId = empInfo.EmpInfoId,
                EmpWebsite = empInfo.EmpWebsite,
                CompanyDescription = empInfo.CompanyDescription,
                WhyWork = empInfo.WhyWork,
                UniqueTitle = empInfo.UniqueTitle,
                UniqueContent = empInfo.UniqueContent,
                AppUserId = id
            };
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpInfoDto>>> GetEmpInfos()
        {
            var empInfos = await _empInfoRepository.GetEmpInfoDtosAsync();

            return Ok(empInfos);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpInfoDto>> GetEmpInfo(int id)
        {
            return await _empInfoRepository.GetEmpInfoDtoAsync(id);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmpInfo(EmpInfoUpdateDto empInfoUpdateDto, int id)
        {
            var empInfo = await _empInfoRepository.GetEmpInfoByIdAsync(id);

            _mapper.Map(empInfoUpdateDto, empInfo);

            _empInfoRepository.Update(empInfo);

            if (await _empInfoRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        // private async Task<bool> StudInfoExists(string studinfoname)
        // {
        //     return await _context.StudInfos.AnyAsync(x => x.StudInfoName == studinfoname.ToLower());
        // }

    }
}