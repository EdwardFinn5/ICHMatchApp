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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public RegisterCodeController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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
                RegisterCodeNameStud = registerCodeDto.RegisterCodeNameStud,
                RegisterCodeNameAdmin = registerCodeDto.RegisterCodeNameAdmin,
                RegisterCodeNameOwner = registerCodeDto.RegisterCodeNameOwner,
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
                RegisterCodeNameStud = registerCode.RegisterCodeNameStud,
                RegisterCodeNameAdmin = registerCode.RegisterCodeNameAdmin,
                RegisterCodeNameOwner = registerCode.RegisterCodeNameOwner,
                IsActive = registerCode.IsActive
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterCodeDto>>> GetRegisterCodes()
        {
            var registerCodes = await _unitOfWork.RegisterCodeRepository.GetRegisterCodesAsync();

            return Ok(registerCodes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterCodeDto>> GetRegisterCodeById(int id)
        {
            return await _unitOfWork.RegisterCodeRepository.GetRegisterCodeDtoByIdAsync(id);
        }

        [HttpGet("GetRegisterCodeById/{id}")] //this is the one I just added
        public async Task<ActionResult<RegisterCode>> GetRegisterCodeByIdAsync(int id)
        {
            return await _unitOfWork.RegisterCodeRepository.GetRegisterCodeByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRegisterCode(RegisterCodeUpdateDto registerCodeUpdateDto, int id)
        {
            var registerCode = await _unitOfWork.RegisterCodeRepository.GetRegisterCodeByIdAsync(id);

            _mapper.Map(registerCodeUpdateDto, registerCode);

            _unitOfWork.RegisterCodeRepository.Update(registerCode);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update register Code");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRegisterCode(int id)
        {
            var registerCode = await _unitOfWork.RegisterCodeRepository.GetRegisterCodeByIdAsync(id);

            _unitOfWork.RegisterCodeRepository.DeleteRegisterCode(registerCode);

            if (await _unitOfWork.RegisterCodeRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the register code");

        }
        // private async Task<bool> RegisterCodeExists(string registerCodeName)
        // {
        //     return await _context.RegisterCodes.AnyAsync(x => x.RegisterCodeName == registerCodeName.ToLower());
        // }
    }
}