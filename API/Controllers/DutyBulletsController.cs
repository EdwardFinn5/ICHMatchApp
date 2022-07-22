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
    public class DutyBulletsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public DutyBulletsController(IUnitOfWork unitOfWork,
                                        IMapper mapper,
                                        DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DutyBulletDto>>> GetDutyBullets(int id)
        {
            var dutyBullets = await _unitOfWork.DutyBulletRepository.GetDutyBulletDtosByPositionIdAsync(id);

            return Ok(dutyBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetDutyBulletById/{id}")] //this is the one I just added
        public async Task<ActionResult<DutyBullet>> GetDutyBulletByIdAsync(int id)
        {
            return await _unitOfWork.DutyBulletRepository.GetDutyBulletByIdAsync(id);
        }

        [HttpGet("GetDutyBulletDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<DutyBulletDto>> GetDutyBulletDtoById(int id)
        {
            return await _unitOfWork.DutyBulletRepository.GetDutyBulletDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<DutyBulletDto>> AddDutyBullet(AddDutyBulletDto addDutyBulletDto, int id)
        {
            if (await DutyBulletExists(addDutyBulletDto.DutyBulletText)) return BadRequest("Duties/Responsibilities bullet point already exists");

            var dutyBullet = new DutyBullet
            {
                // DutyBulletId = addDutyBulletDto.DutyBulletId,
                PositionId = id,
                DutyBulletText = addDutyBulletDto.DutyBulletText,
                Order = addDutyBulletDto.Order
            };

            _context.DutyBullets.Add(dutyBullet);
            await _context.SaveChangesAsync();

            return new DutyBulletDto
            {
                DutyBulletId = dutyBullet.DutyBulletId,
                DutyBulletText = dutyBullet.DutyBulletText,
                Order = addDutyBulletDto.Order,
                IsActive = addDutyBulletDto.IsActive,
                PositionId = dutyBullet.PositionId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDutyBullet(int id)
        {
            var dutyBullet = await _unitOfWork.DutyBulletRepository.GetDutyBulletByIdAsync(id);

            _unitOfWork.DutyBulletRepository.DeleteDutyBullet(dutyBullet);

            if (await _unitOfWork.DutyBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the duties/responsibilities bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDutyBullet(DutyBulletUpdateDto dutyBulletUpdateDto, int id)
        {
            var dutyBullet = await _unitOfWork.DutyBulletRepository.GetDutyBulletByIdAsync(id);

            _mapper.Map(dutyBulletUpdateDto, dutyBullet);

            _unitOfWork.DutyBulletRepository.Update(dutyBullet);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update duties/responsibilities bullet point");
        }


        private async Task<bool> DutyBulletExists(string dutyBulletText)
        {
            return await _context.DutyBullets.AnyAsync(x => x.DutyBulletText == dutyBulletText.ToLower());
        }

    }
}