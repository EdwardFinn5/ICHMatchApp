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
    public class WorkBulletsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public WorkBulletsController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<WorkBulletDto>>> GetWorkBullets(int id)
        {
            var workBullets = await _unitOfWork.WorkBulletRepository.GetWorkBulletDtosByStudInfoIdAsync(id);

            return Ok(workBullets);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetWorkBulletById/{id}")]
        public async Task<ActionResult<WorkBullet>> GetWorkBulletByIdAsync(int id)
        {
            return await _unitOfWork.WorkBulletRepository.GetWorkBulletByIdAsync(id);
        }

        [HttpGet("GetWorkBulletDtoById/{id}")]
        public async Task<ActionResult<WorkBulletDto>> GetWorkBulletDtoById(int id)
        {
            return await _unitOfWork.WorkBulletRepository.GetWorkBulletDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<WorkBulletDto>> AddWorkBullet(AddWorkBulletDto addWorkBulletDto, int id)
        {
            if (await WorkBulletExists(addWorkBulletDto.WorkBulletText)) return BadRequest("Work related bullet point already exists");

            var workBullet = new WorkBullet
            {
                StudInfoId = id,
                WorkBulletText = addWorkBulletDto.WorkBulletText,
                Order = addWorkBulletDto.Order
            };

            _context.WorkBullets.Add(workBullet);
            await _context.SaveChangesAsync();

            return new WorkBulletDto
            {
                WorkBulletId = workBullet.WorkBulletId,
                WorkBulletText = workBullet.WorkBulletText,
                Order = addWorkBulletDto.Order,
                IsActive = addWorkBulletDto.IsActive,
                StudInfoId = workBullet.StudInfoId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWorkBullet(int id)
        {
            var workBullet = await _unitOfWork.WorkBulletRepository.GetWorkBulletByIdAsync(id);

            _unitOfWork.WorkBulletRepository.DeleteWorkBullet(workBullet);

            if (await _unitOfWork.WorkBulletRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this work related bullet point");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateWorkBullet(WorkBulletUpdateDto workBulletUpdateDto, int id)
        {
            var workBullet = await _unitOfWork.WorkBulletRepository.GetWorkBulletByIdAsync(id);

            _mapper.Map(workBulletUpdateDto, workBullet);

            _unitOfWork.WorkBulletRepository.Update(workBullet);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update work related bullet point");
        }


        private async Task<bool> WorkBulletExists(string workBulletText)
        {
            return await _context.WorkBullets.AnyAsync(x => x.WorkBulletText == workBulletText.ToLower());
        }

    }
}