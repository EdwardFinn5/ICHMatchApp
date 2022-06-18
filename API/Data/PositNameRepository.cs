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
    public class PositNameRepository : IPositNameRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PositNameRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeletePositName(PositName positName)
        {
            _context.PositNames.Remove(positName);
        }

        public async Task<PositName> GetPositNameByIdAsync(int id)
        {
            return await _context.PositNames
            .Where(x => x.PositNameId == id)
           // .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
           .SingleOrDefaultAsync();
        }

        public async Task<PositNameDto> GetPositNameDtoByIdAsync(int id)
        {
            return await _context.PositNames
                 .Where(x => x.PositNameId == id)
                 .ProjectTo<PositNameDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<PositNameDto>> GetPositNameDtosAsync(int id)
        {
            return await _context.PositNames
            .Where(p => p.PosCategoryId == id)
            .OrderBy(x => x.PosName)
            .ProjectTo<PositNameDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<IEnumerable<PositNameDto>> GetPositNameDtosAsync()
        {
            return await _context.PositNames
            .ProjectTo<PositNameDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(PositName positName)
        {
            _context.Entry(positName).State = EntityState.Modified;
        }
    }
}