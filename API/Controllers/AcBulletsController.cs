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
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AcBulletsController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _unitOfWork = unitOfWork;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AcBulletDto>>> GetAcBullets(int id)
        {
            var acBullets = await _unitOfWork.AcBulletRepository.GetAcBulletDtosByStudInfoIdAsync(id);

            return Ok(acBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetAcBulletById/{id}")]
        public async Task<ActionResult<AcBullet>> GetAcBulletByIdAsync(int id)
        {
            return await _unitOfWork.AcBulletRepository.GetAcBulletByIdAsync(id);
        }

        [HttpGet("GetAcBulletDtoById/{id}")]
        public async Task<ActionResult<AcBulletDto>> GetAcBulletDtoById(int id)
        {
            return await _unitOfWork.AcBulletRepository.GetAcBulletDtoByIdAsync(id);
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
            var acBullet = await _unitOfWork.AcBulletRepository.GetAcBulletByIdAsync(id);

            _unitOfWork.AcBulletRepository.DeleteAcBullet(acBullet);

            if (await _unitOfWork.AcBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this academic achievement bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAcBullet(AcBulletUpdateDto acBulletUpdateDto, int id)
        {
            var acBullet = await _unitOfWork.AcBulletRepository.GetAcBulletByIdAsync(id);

            _mapper.Map(acBulletUpdateDto, acBullet);

            _unitOfWork.AcBulletRepository.Update(acBullet);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update academic achievement bullet point");
        }


        private async Task<bool> AcBulletExists(string acBulletText)
        {
            return await _context.AcBullets.AnyAsync(x => x.AcBulletText == acBulletText.ToLower());
        }

    }
}