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
    public class RegisterCodeController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IRegisterCodeRepository _registerCodeRepository;
        private readonly IMapper _mapper;
        public RegisterCodeController(DataContext context, IRegisterCodeRepository registerCodeRepository, IMapper mapper)
        {
            _mapper = mapper;
            _registerCodeRepository = registerCodeRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<RegisterCodeDto>> AddRegisterCode(RegisterCodeDto registerCodeDto)
        {
            var registerCode = new RegisterCode
            {
                RegisterCodeName1 = registerCodeDto.RegisterCodeName1,
                RegisterCodeName2 = registerCodeDto.RegisterCodeName2,
                RegisterCodeName3 = registerCodeDto.RegisterCodeName3,
                RegisterCodeName4 = registerCodeDto.RegisterCodeName4,
                RegisterCodeName5 = registerCodeDto.RegisterCodeName5,
                RegisterCodeName6 = registerCodeDto.RegisterCodeName6,
                RegisterCodeName7 = registerCodeDto.RegisterCodeName7,
                RegisterCodeName8 = registerCodeDto.RegisterCodeName8
            };

            _context.RegisterCodes.Add(registerCode);
            await _context.SaveChangesAsync();

            return new RegisterCodeDto
            {
                RegisterCodeId = registerCode.RegisterCodeId,
                RegisterCodeName1 = registerCode.RegisterCodeName1,
                RegisterCodeName2 = registerCode.RegisterCodeName2,
                RegisterCodeName3 = registerCode.RegisterCodeName3,
                RegisterCodeName4 = registerCode.RegisterCodeName4,
                RegisterCodeName5 = registerCode.RegisterCodeName5,
                RegisterCodeName6 = registerCode.RegisterCodeName6,
                RegisterCodeName7 = registerCode.RegisterCodeName7,
                RegisterCodeName8 = registerCode.RegisterCodeName8,
                IsActive = registerCode.IsActive
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterCodeDto>>> GetRegisterCodes()
        {
            var registerCodes = await _registerCodeRepository.GetRegisterCodesAsync();

            return Ok(registerCodes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterCodeDto>> GetRegisterCodeById(int id)
        {
            return await _registerCodeRepository.GetRegisterCodeDtoByIdAsync(id);
        }

        [HttpGet("GetRegisterCodeById/{id}")] //this is the one I just added
        public async Task<ActionResult<RegisterCode>> GetRegisterCodeByIdAsync(int id)
        {
            return await _registerCodeRepository.GetRegisterCodeByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRegisterCode(RegisterCodeUpdateDto registerCodeUpdateDto, int id)
        {
            var registerCode = await _registerCodeRepository.GetRegisterCodeByIdAsync(id);

            _mapper.Map(registerCodeUpdateDto, registerCode);

            _registerCodeRepository.Update(registerCode);

            if (await _registerCodeRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update register Code");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRegisterCode(int id)
        {
            var registerCode = await _registerCodeRepository.GetRegisterCodeByIdAsync(id);

            _registerCodeRepository.DeleteRegisterCode(registerCode);

            if (await _registerCodeRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the register code");

        }
        // private async Task<bool> RegisterCodeExists(string registerCodeName)
        // {
        //     return await _context.RegisterCodes.AnyAsync(x => x.RegisterCodeName == registerCodeName.ToLower());
        // }
    }
}