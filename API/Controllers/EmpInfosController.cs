using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EmpInfosController : BaseApiController
    {
        private readonly IEmpInfoRepository _empInfoRepository;
        private readonly IMapper _mapper;
        public EmpInfosController(IEmpInfoRepository empInfoRepository, IMapper mapper)
        {
            _mapper = mapper;
            _empInfoRepository = empInfoRepository;
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

    }
}