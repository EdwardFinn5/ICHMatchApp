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
        private readonly IDutyBulletRepository _dutyBulletRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public DutyBulletsController(IDutyBulletRepository dutyBulletRepository,
                                        IMapper mapper,
                                        DataContext context)
        {
            _dutyBulletRepository = dutyBulletRepository;
            _context = context;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DutyBulletDto>>> GetDutyBullets(int id)
        {
            var dutyBullets = await _dutyBulletRepository.GetDutyBulletDtosByPositionIdAsync(id);

            return Ok(dutyBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetDutyBulletById/{id}")] //this is the one I just added
        public async Task<ActionResult<DutyBullet>> GetDutyBulletByIdAsync(int id)
        {
            return await _dutyBulletRepository.GetDutyBulletByIdAsync(id);
        }

        [HttpGet("GetDutyBulletDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<DutyBulletDto>> GetDutyBulletDtoById(int id)
        {
            return await _dutyBulletRepository.GetDutyBulletDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<DutyBulletDto>> AddDutyBullet(AddDutyBulletDto addDutyBulletDto, int id)
        {
            if (await DutyBulletExists(addDutyBulletDto.DutyBulletText)) return BadRequest("Duties/Responsibilities bullet point already in place");

            var dutyBullet = new DutyBullet
            {
                DutyBulletId = addDutyBulletDto.DutyBulletId,
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
                IsActive = addDutyBulletDto.IsActive == true
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDutyBullet(int id)
        {
            var dutyBullet = await _dutyBulletRepository.GetDutyBulletByIdAsync(id);

            _dutyBulletRepository.DeleteDutyBullet(dutyBullet);

            if (await _dutyBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the duties/resobsibilities bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDutyBullet(DutyBulletUpdateDto dutyBulletUpdateDto, int id)
        {
            var dutyBullet = await _dutyBulletRepository.GetDutyBulletByIdAsync(id);

            _mapper.Map(dutyBulletUpdateDto, dutyBullet);

            _dutyBulletRepository.Update(dutyBullet);

            if (await _dutyBulletRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update duties/responsibilities bullet point");
        }


        private async Task<bool> DutyBulletExists(string dutyBulletText)
        {
            return await _context.DutyBullets.AnyAsync(x => x.DutyBulletText == dutyBulletText.ToLower());
        }

    }
}