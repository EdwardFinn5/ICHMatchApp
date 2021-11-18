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
    public class StudInfosController : BaseApiController
    {
        private readonly IStudInfoRepository _studInfoRepository;
        private readonly IMapper _mapper;
        public StudInfosController(IStudInfoRepository studInfoRepository, IMapper mapper)
        {
            _mapper = mapper;
            _studInfoRepository = studInfoRepository;
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

    }
}