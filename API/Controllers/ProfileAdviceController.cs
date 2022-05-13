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
    public class ProfileAdviceController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IProfileAdviceRepository _profileAdviceRepository;
        private readonly IMapper _mapper;
        public ProfileAdviceController(DataContext context, IProfileAdviceRepository profileAdviceRepository, IMapper mapper)
        {
            _mapper = mapper;
            _profileAdviceRepository = profileAdviceRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ProfileAdviceDto>> AddProfileAdvice(ProfileAdviceDto profileAdviceDto)
        {
            if (await ProfileAdviceExists(profileAdviceDto.ProfileAdviceTitle)) return BadRequest("ProfileAdvice is already in place");

            var profileAdvice = new ProfileAdvice
            {
                // CategoryId = categoryDto.CategoryId,
                ProfileAdviceTitle = profileAdviceDto.ProfileAdviceTitle,
                ProfileAdviceContent = profileAdviceDto.ProfileAdviceContent,
                Order = profileAdviceDto.Order
            };

            _context.ProfileAdvices.Add(profileAdvice);
            await _context.SaveChangesAsync();

            return new ProfileAdviceDto
            {
                ProfileAdviceId = profileAdvice.ProfileAdviceId,
                ProfileAdviceTitle = profileAdvice.ProfileAdviceTitle,
                ProfileAdviceContent = profileAdvice.ProfileAdviceContent,
                Order = profileAdvice.Order,
                IsActive = profileAdvice.IsActive
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfileAdviceDto>>> GetProfileAdvices()
        {
            var profileAdvices = await _profileAdviceRepository.GetProfileAdvicesAsync();

            return Ok(profileAdvices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileAdviceDto>> GetProfileAdviceById(int id)
        {
            return await _profileAdviceRepository.GetProfileAdviceDtoByIdAsync(id);
        }

        [HttpGet("GetProfileAdviceById/{id}")] //this is the one I just added
        public async Task<ActionResult<ProfileAdvice>> GetProfileAdvicByIdAsync(int id)
        {
            return await _profileAdviceRepository.GetProfileAdviceByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProfileAdvice(ProfileAdviceUpdateDto profileAdviceUpdateDto, int id)
        {
            var profileAdvice = await _profileAdviceRepository.GetProfileAdviceByIdAsync(id);

            _mapper.Map(profileAdviceUpdateDto, profileAdvice);

            _profileAdviceRepository.Update(profileAdvice);

            if (await _profileAdviceRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update profileAdvice");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProfileAdvice(int id)
        {
            var profileAdvice = await _profileAdviceRepository.GetProfileAdviceByIdAsync(id);

            _profileAdviceRepository.DeleteProfileAdvice(profileAdvice);

            if (await _profileAdviceRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the profileAdvice");

        }
        private async Task<bool> ProfileAdviceExists(string profileAdviceTitle)
        {
            return await _context.ProfileAdvices.AnyAsync(x => x.ProfileAdviceTitle == profileAdviceTitle.ToLower());
        }
    }
}