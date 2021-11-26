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
    public class PositionsController : BaseApiController
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IMapper _mapper;
        public PositionsController(IPositionRepository positionRepository, IMapper mapper)
        {
            _mapper = mapper;
            _positionRepository = positionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetPositions()
        {
            var positions = await _positionRepository.GetPositionDtosAsync();

            return Ok(positions);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PositionDto>> GetPosition(int id)
        {
            return await _positionRepository.GetPositionDtoAsync(id);

        }
    }
}