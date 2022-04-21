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
    public class OtherCCController : BaseApiController
    {
        private readonly IOtherCCRepository _otherCCRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public OtherCCController(IOtherCCRepository otherCCRepository,
                                IMapper mapper,
                                DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _otherCCRepository = otherCCRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OtherCCDto>>> GetOtherCCs()
        {
            var otherCCs = await _otherCCRepository.GetOtherCCDtosAsync();

            return Ok(otherCCs);
            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<IEnumerable<OtherCCDto>>> GetById(int id)
        {
            var otherCCs = await _otherCCRepository.GetOtherCCDtosAsync(id);

            return Ok(otherCCs);

        }

        [HttpGet("GetOtherCCById/{id}")] //this is the one I just added
        public async Task<ActionResult<OtherCC>> GetOtherCCById(int id)
        {
            return await _otherCCRepository.GetOtherCCByIdAsync(id);
        }

        [HttpGet("GetOtehrCCDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<OtherCCDto>> GetOtherCCDtoById(int id)
        {
            return await _otherCCRepository.GetOtherCCDtoByIdAsync(id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<OtherCCDto>> AddOtherCC(AddOtherCCDto addOtherCCDto, int id)
        {
            if (await OtherCCExists(addOtherCCDto.OtherCCName)) return BadRequest("Country and City has already been added");

            var otherCC = new OtherCC
            {
                // CategoryId = categoryDto.CategoryId,
                OtherCCName = addOtherCCDto.OtherCCName,
                CoLocationId = id
            };

            _context.OtherCCs.Add(otherCC);
            await _context.SaveChangesAsync();

            return new OtherCCDto
            {
                OtherCCId = otherCC.OtherCCId,
                OtherCCName = otherCC.OtherCCName,
                CoLocationId = otherCC.CoLocationId
            };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOtherCC(int id)
        {
            var otherCC = await _otherCCRepository.GetOtherCCByIdAsync(id);

            _otherCCRepository.DeleteOtherCC(otherCC);

            if (await _otherCCRepository.Complete()) return Ok();

            return BadRequest("Problem deleting County & City");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOtherCC(OtherCCUpdateDto otherCCUpdateDto, int id)
        {
            var otherCC = await _otherCCRepository.GetOtherCCByIdAsync(id);

            _mapper.Map(otherCCUpdateDto, otherCC);

            _otherCCRepository.Update(otherCC);

            if (await _otherCCRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update Country & City");
        }


        private async Task<bool> OtherCCExists(string otherCCName)
        {
            return await _context.OtherCCs.AnyAsync(x => x.OtherCCName == otherCCName.ToLower());
        }
    }
}