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
    public class PositionsController : BaseApiController
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PositionsController(IPositionRepository positionRepository, IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _positionRepository = positionRepository;
            _context = context;
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

        [HttpPost("{id}")]
        public async Task<ActionResult<PositionDto>> AddPosition(AddPositionDto addPositionDto, int id)
        {
            if (await PositionExists(addPositionDto.PositionIdentifier)) return BadRequest("Position is already in place");

            var position = new Position
            {
                PositionId = addPositionDto.PositionId,
                PositionIdentifier = addPositionDto.PositionIdentifier,
                PositionName = addPositionDto.PositionName,
                PositionDescription = addPositionDto.PositionDescription,
                LookingFor = addPositionDto.LookingFor,
                PositionBenefits = addPositionDto.PositionBenefits,
                PositionType = addPositionDto.PositionType,
                PositionLocation = addPositionDto.PositionLocation,
                DateAdded = addPositionDto.DateAdded,
                StartDate = addPositionDto.StartDate,
                AppDeadline = addPositionDto.AppDeadline,
                HrContact = addPositionDto.HrContact,
                HrContactTitle = addPositionDto.HrContactTitle,
                HowToApply = addPositionDto.HowToApply,
                ApplyEmail = addPositionDto.ApplyEmail,
                ApplyLink = addPositionDto.ApplyLink,
                AppUserId = id,
            };

            _context.Positions.Add(position);
            await _context.SaveChangesAsync();

            return new PositionDto
            {
                PositionId = position.PositionId,
                PositionIdentifier = position.PositionIdentifier,
                PositionName = position.PositionName,
                LookingFor = position.LookingFor,
                AppUserId = id
            };
        }

        private async Task<bool> PositionExists(string positionIdentifier)
        {
            return await _context.Positions.AnyAsync(x => x.PositionIdentifier == positionIdentifier.ToLower());
        }

    }
}