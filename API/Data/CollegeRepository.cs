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
    public class CollegeRepository : ICollegeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CollegeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteCollege(College college)
        {
            _context.Colleges.Remove(college);
        }

        public async Task<College> GetCollegeByIdAsync(int id)
        {
            return await _context.Colleges
                  .Where(x => x.CollegeId == id)
                  //   .ProjectTo<CollegeDto>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync();
        }

        public async Task<CollegeDto> GetCollegeDtoByIdAsync(int id)
        {
            return await _context.Colleges
                  .Where(x => x.CollegeId == id)
                  .ProjectTo<CollegeDto>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<CollegeDto>> GetCollegesAsync()
        {
            return await _context.Colleges
            .OrderBy(c => c.CollegeName)
            .ProjectTo<CollegeDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(College college)
        {
            _context.Entry(college).State = EntityState.Modified;
        }
    }
}