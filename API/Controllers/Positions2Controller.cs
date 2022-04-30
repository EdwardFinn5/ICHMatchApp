using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class Positions2Controller : BaseApiController
    {
        private readonly IPosition2Repository _position2Repository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public Positions2Controller(IPosition2Repository position2Repository, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _position2Repository = position2Repository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetPositions([FromQuery] UserParams userParams)
        {
            var positions = await _position2Repository.GetPositionDtosAsync(userParams);

            Response.AddPaginationHeader(
                       positions.CurrentPage,
                       positions.PageSize,
                       positions.TotalCount,
                       positions.TotalPages
                       );

            return Ok(positions);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetById(int id)
        {
            var positions = await _position2Repository.GetPositionDtosAsync(id);

            return Ok(positions);

        }

        [HttpGet("GetPositionById/{id}")] //this is the one I just added
        public async Task<ActionResult<Position>> GetPositionById(int id)
        {
            return await _position2Repository.GetPositionByIdAsync(id);
        }

        [HttpGet("GetPositionDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositionDto>> GetPositionDtoById(int id)
        {
            return await _position2Repository.GetPositionDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<PositionDto>> AddPosition(AddPositionDto addPositionDto, int id)
        {
            if (await PositionExists(addPositionDto.PositName)) return BadRequest("Position is already in place");

            var position = new Position
            {
                PositionId = addPositionDto.PositionId,
                RegisterCode = addPositionDto.RegisterCode,
                PositName = addPositionDto.PositName,
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
                RegisterCode = position.RegisterCode,
                PositName = position.PositName,
                LookingFor = position.LookingFor,
                PositionLocation = position.PositionLocation,
                AppUserId = id
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePosition(int id)
        {
            var position = await _position2Repository.GetPositionByIdAsync(id);

            _position2Repository.DeletePosition(position);

            if (await _position2Repository.Complete()) return Ok();

            return BadRequest("Problem deleting the position");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePosition(PositionUpdateDto positionUpdateDto, int id)
        {
            var position = await _position2Repository.GetPositionByIdAsync(id);

            _mapper.Map(positionUpdateDto, position);

            _position2Repository.Update(position);

            if (await _position2Repository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update position");
        }


        private async Task<bool> PositionExists(string positName)
        {
            return await _context.Positions.AnyAsync(x => x.PositName == positName.ToLower());
        }

    }
}