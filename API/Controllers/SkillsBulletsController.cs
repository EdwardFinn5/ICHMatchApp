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
    public class SkillsBulletsController : BaseApiController
    {
        private readonly ISkillsBulletRepository _skillsBulletRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public SkillsBulletsController(ISkillsBulletRepository skillsBulletRepository,
                                        IMapper mapper,
                                        DataContext context)
        {
            _skillsBulletRepository = skillsBulletRepository;
            _context = context;
            _mapper = mapper;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<SkillsBulletDto>>> GetSkillsBullets(int id)
        {
            var skillsBullets = await _skillsBulletRepository.GetSkillsBulletDtosByPositionIdAsync(id);

            return Ok(skillsBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetSkillsBulletById/{id}")] //this is the one I just added
        public async Task<ActionResult<SkillsBullet>> GeSkillsBulletByIdAsync(int id)
        {
            return await _skillsBulletRepository.GetSkillsBulletByIdAsync(id);
        }

        [HttpGet("GetSkillsBulletDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<SkillsBulletDto>> GetSkillsBulletDtoById(int id)
        {
            return await _skillsBulletRepository.GetSkillsBulletDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<SkillsBulletDto>> AddSkillsBullet(AddSkillsBulletDto addSkillsBulletDto, int id)
        {
            if (await SkillsBulletExists(addSkillsBulletDto.SkillsBulletText)) return BadRequest("Skills/Requirements bullet point already exists");

            var skillsBullet = new SkillsBullet
            {
                // DutyBulletId = addDutyBulletDto.DutyBulletId,
                PositionId = id,
                SkillsBulletText = addSkillsBulletDto.SkillsBulletText,
                Order = addSkillsBulletDto.Order
            };

            _context.SkillsBullets.Add(skillsBullet);
            await _context.SaveChangesAsync();

            return new SkillsBulletDto
            {
                SkillsBulletId = skillsBullet.SkillsBulletId,
                SkillsBulletText = skillsBullet.SkillsBulletText,
                Order = addSkillsBulletDto.Order,
                IsActive = addSkillsBulletDto.IsActive,
                PositionId = skillsBullet.PositionId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSkillsBullet(int id)
        {
            var skillsBullet = await _skillsBulletRepository.GetSkillsBulletByIdAsync(id);

            _skillsBulletRepository.DeleteSkillsBullet(skillsBullet);

            if (await _skillsBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the skills/requirments bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSkillsBullet(SkillsBulletUpdateDto skillsBulletUpdateDto, int id)
        {
            var skillsBullet = await _skillsBulletRepository.GetSkillsBulletByIdAsync(id);

            _mapper.Map(skillsBulletUpdateDto, skillsBullet);

            _skillsBulletRepository.Update(skillsBullet);

            if (await _skillsBulletRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update skills/requirements bullet point");
        }


        private async Task<bool> SkillsBulletExists(string skillsBulletText)
        {
            return await _context.SkillsBullets.AnyAsync(x => x.SkillsBulletText == skillsBulletText.ToLower());
        }

    }
}