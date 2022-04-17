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
    public class MajorRepository : IMajorRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MajorRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteMajor(Major major)
        {
            _context.Majors.Remove(major);
        }

        public async Task<Major> GetMajorByIdAsync(int id)
        {
            return await _context.Majors
               .Where(x => x.MajorId == id)
               .SingleOrDefaultAsync();
        }

        public async Task<MajorDto> GetMajorDtoByIdAsync(int id)
        {
            return await _context.Majors
             .Where(x => x.MajorId == id)
             .ProjectTo<MajorDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MajorDto>> GetMajorDtosAsync(int id)
        {
            return await _context.Majors
                  .Where(x => x.CategoryId == id)
                  .ProjectTo<MajorDto>(_mapper.ConfigurationProvider)
                  .ToListAsync();
        }

        public async Task<IEnumerable<MajorDto>> GetMajorDtosAsync()
        {
            return await _context.Majors
            .ProjectTo<MajorDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Major major)
        {
            _context.Entry(major).State = EntityState.Modified;
        }

        public async Task<IEnumerable<Major>> GetMajorsAsync()
        {
            return await _context.Majors
                  .Include(a => a.Category)
                  .ToListAsync();
        }
    }
}