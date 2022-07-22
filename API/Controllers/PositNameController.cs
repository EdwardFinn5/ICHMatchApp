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
    public class PositNameController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public PositNameController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PositNameDto>>> GetPositNames()
        {
            var positNames = await _unitOfWork.PositNameRepository.GetPositNameDtosAsync();

            return Ok(positNames);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<PositNameDto>>> GetById(int id)
        {
            var positNames = await _unitOfWork.PositNameRepository.GetPositNameDtosAsync(id);

            return Ok(positNames);

        }

        [HttpGet("GetPositNameById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositName>> GetPositNameById(int id)
        {
            return await _unitOfWork.PositNameRepository.GetPositNameByIdAsync(id);
        }

        [HttpGet("GetPositNameDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositNameDto>> GetPositNameDtoById(int id)
        {
            return await _unitOfWork.PositNameRepository.GetPositNameDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<PositNameDto>> AddPositName(AddPositNameDto addPositNameDto, int id)
        {
            if (await PosNameExists(addPositNameDto.PosName)) return BadRequest("Position is already included -- perhaps in another position-category");

            var positName = new PositName
            {
                // CategoryId = categoryDto.CategoryId,
                PosName = addPositNameDto.PosName,
                PosCategoryId = id
            };

            _context.PositNames.Add(positName);
            await _context.SaveChangesAsync();

            return new PositNameDto
            {
                PositNameId = positName.PositNameId,
                PosName = positName.PosName,
                PosCategoryId = positName.PosCategoryId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePositName(int id)
        {
            var positName = await _unitOfWork.PositNameRepository.GetPositNameByIdAsync(id);

            _unitOfWork.PositNameRepository.DeletePositName(positName);

            if (await _unitOfWork.PositNameRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the position name");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePositName(PositNameUpdateDto positNameUpdateDto, int id)
        {
            var posName = await _unitOfWork.PositNameRepository.GetPositNameByIdAsync(id);

            _mapper.Map(positNameUpdateDto, posName);

            _unitOfWork.PositNameRepository.Update(posName);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update position name");
        }


        private async Task<bool> PosNameExists(string posName)
        {
            return await _context.PositNames.AnyAsync(x => x.PosName == posName.ToLower());
        }

    }
}