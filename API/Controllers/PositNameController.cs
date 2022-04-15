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
        private readonly IPositNameRepository _positNameRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PositNameController(IPositNameRepository positNameRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _positNameRepository = positNameRepository;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PositNameDto>>> GetPositNames()
        {
            var positNames = await _positNameRepository.GetPositNameDtosAsync();

            return Ok(positNames);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<PositNameDto>>> GetById(int id)
        {
            var positNames = await _positNameRepository.GetPositNameDtosAsync(id);

            return Ok(positNames);

        }

        [HttpGet("GetPositNameById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositName>> GetPositNameById(int id)
        {
            return await _positNameRepository.GetPositNameByIdAsync(id);
        }

        [HttpGet("GetPositNameDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<PositNameDto>> GetPositNameDtoById(int id)
        {
            return await _positNameRepository.GetPositNameDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<PositNameDto>> AddPositName(AddPositNameDto addPositNameDto, int id)
        {
            if (await PosNameExists(addPositNameDto.PosName)) return BadRequest("Position name is already included in this category");

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
            var positName = await _positNameRepository.GetPositNameByIdAsync(id);

            _positNameRepository.DeletePositName(positName);

            if (await _positNameRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the position name");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePositName(PositNameUpdateDto positNameUpdateDto, int id)
        {
            var posName = await _positNameRepository.GetPositNameByIdAsync(id);

            _mapper.Map(positNameUpdateDto, posName);

            _positNameRepository.Update(posName);

            if (await _positNameRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update position name");
        }


        private async Task<bool> PosNameExists(string posName)
        {
            return await _context.PositNames.AnyAsync(x => x.PosName == posName.ToLower());
        }

    }
}