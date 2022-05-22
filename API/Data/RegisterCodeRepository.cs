using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RegisterCodeRepository : IRegisterCodeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RegisterCodeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteRegisterCode(RegisterCode registerCode)
        {
            _context.RegisterCodes.Remove(registerCode);
        }

        public async Task<RegisterCode> GetRegisterCodeByIdAsync(int id)
        {
            return await _context.RegisterCodes
              .Where(x => x.RegisterCodeId == id)
              .SingleOrDefaultAsync();
        }

        public async Task<RegisterCodeDto> GetRegisterCodeDtoByIdAsync(int id)
        {
            return await _context.RegisterCodes
                  .Where(x => x.RegisterCodeId == id)
                  .ProjectTo<RegisterCodeDto>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<RegisterCodeDto>> GetRegisterCodesAsync()
        {
            return await _context.RegisterCodes
           .ProjectTo<RegisterCodeDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(RegisterCode registerCode)
        {
            _context.Entry(registerCode).State = EntityState.Modified;
        }
    }
}