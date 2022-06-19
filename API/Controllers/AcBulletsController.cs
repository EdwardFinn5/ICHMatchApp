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
    public class AcBulletsController : BaseApiController
    {
        private readonly IAcBulletRepository _acBulletRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AcBulletsController(IAcBulletRepository acBulletRepository,
                                        IMapper mapper,
                                        DataContext context)
        {
            _acBulletRepository = acBulletRepository;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AcBulletDto>>> GetAcBullets(int id)
        {
            var acBullets = await _acBulletRepository.GetAcBulletDtosByStudInfoIdAsync(id);

            return Ok(acBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetAcBulletById/{id}")]
        public async Task<ActionResult<AcBullet>> GetAcBulletByIdAsync(int id)
        {
            return await _acBulletRepository.GetAcBulletByIdAsync(id);
        }

        [HttpGet("GetAcBulletDtoById/{id}")]
        public async Task<ActionResult<AcBulletDto>> GetAcBulletDtoById(int id)
        {
            return await _acBulletRepository.GetAcBulletDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<AcBulletDto>> AddAcBullet(AddAcBulletDto addAcBulletDto, int id)
        {
            if (await AcBulletExists(addAcBulletDto.AcBulletText)) return BadRequest("Academic achievement bullet point already exists");

            var acBullet = new AcBullet
            {
                StudInfoId = id,
                AcBulletText = addAcBulletDto.AcBulletText,
                Order = addAcBulletDto.Order
            };

            _context.AcBullets.Add(acBullet);
            await _context.SaveChangesAsync();

            return new AcBulletDto
            {
                AcBulletId = acBullet.AcBulletId,
                AcBulletText = acBullet.AcBulletText,
                Order = addAcBulletDto.Order,
                IsActive = addAcBulletDto.IsActive,
                StudInfoId = acBullet.StudInfoId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAcBullet(int id)
        {
            var acBullet = await _acBulletRepository.GetAcBulletByIdAsync(id);

            _acBulletRepository.DeleteAcBullet(acBullet);

            if (await _acBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this academic achievement bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAcBullet(AcBulletUpdateDto acBulletUpdateDto, int id)
        {
            var acBullet = await _acBulletRepository.GetAcBulletByIdAsync(id);

            _mapper.Map(acBulletUpdateDto, acBullet);

            _acBulletRepository.Update(acBullet);

            if (await _acBulletRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update academic achievement bullet point");
        }


        private async Task<bool> AcBulletExists(string acBulletText)
        {
            return await _context.AcBullets.AnyAsync(x => x.AcBulletText == acBulletText.ToLower());
        }

    }
}