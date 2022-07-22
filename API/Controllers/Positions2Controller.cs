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
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;
        public Positions2Controller(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetPositions([FromQuery] UserParams userParams)
        {
            var positions = await _unitOfWork.Position2Repository.GetPositionDtosAsync(userParams);

            Response.AddPaginationHeader(
                       positions.CurrentPage,
                       positions.PageSize,
                       positions.TotalCount,
                       positions.TotalPages
                       );

            return Ok(positions);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetAllPositions")]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetAllPositions()
        {
            var positions = await _unitOfWork.Position2Repository.GetEdsPositionDtosAsync();

            return Ok(positions);

        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<PositionDto>>> GetById(int id)
        {
            var positions = await _unitOfWork.Position2Repository.GetPositionDtosAsync(id);

            return Ok(positions);

        }

        [HttpGet("GetPositionById/{id}")] //this is the one I just added
        public async Task<ActionResult<Position>> GetPositionById(int id)
        {
            return await _unitOfWork.Position2Repository.GetPositionByIdAsync(id);
        }

        [HttpGet("GetPositionDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositionDto>> GetPositionDtoById(int id)
        {
            return await _unitOfWork.Position2Repository.GetPositionDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<PositionDto>> AddPosition(AddPositionDto addPositionDto, int id)
        {
            // if (await PositionExists(addPositionDto.PosName)) return BadRequest("Position is already in place");

            var position = new Position
            {
                PositionId = addPositionDto.PositionId,
                RegisterCode = addPositionDto.RegisterCode,
                PosName = addPositionDto.PosName,
                PosCategory = addPositionDto.PosCategory,
                IsActive = addPositionDto.IsActive,
                PositionDescription = addPositionDto.PositionDescription,
                // LookingFor = addPositionDto.LookingFor,
                PositionBenefits = addPositionDto.PositionBenefits,
                UniqueTitle = addPositionDto.UniqueTitle,
                UniqueContent = addPositionDto.UniqueContent,
                PositionType = addPositionDto.PositionType,
                SalaryRange = addPositionDto.SalaryRange,
                CiempLocation = addPositionDto.CiempLocation,
                StempLocation = addPositionDto.StempLocation,
                DateAdded = addPositionDto.DateAdded,
                StartDate = addPositionDto.StartDate,
                AppDeadline = addPositionDto.AppDeadline,
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
                IsActive = position.IsActive,
                RegisterCode = position.RegisterCode,
                PosCategory = position.PosCategory,
                PosName = position.PosName,
                // LookingFor = position.LookingFor,
                CiempLocation = position.CiempLocation,
                StempLocation = position.StempLocation,
                UniqueTitle = position.UniqueTitle,
                UniqueContent = position.UniqueContent,
                AppUserId = id
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePosition(int id)
        {
            var position = await _unitOfWork.Position2Repository.GetPositionByIdAsync(id);

            _unitOfWork.Position2Repository.DeletePosition(position);

            if (await _unitOfWork.Position2Repository.Complete()) return Ok();

            return BadRequest("Problem deleting the position");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePosition(PositionUpdateDto positionUpdateDto, int id)
        {
            var position = await _unitOfWork.Position2Repository.GetPositionByIdAsync(id);

            _mapper.Map(positionUpdateDto, position);

            _unitOfWork.Position2Repository.Update(position);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update position");
        }


        // private async Task<bool> PositionExists(string posName)
        // {
        //     return await _context.Positions.AnyAsync(x => x.PosName == posName.ToLower());
        // }

    }
}