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
    public class EmpIndustryRepository : IEmpIndustryRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmpIndustryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteEmpIndustry(EmpIndustry empIndustry)
        {
            _context.EmpIndustries.Remove(empIndustry);
        }

        public async Task<IEnumerable<EmpIndustryDto>> GetEmpIndustriesAsync()
        {
            return await _context.EmpIndustries
           .OrderBy(c => c.EmpIndustryName)
           .ProjectTo<EmpIndustryDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<EmpIndustry> GetEmpIndustryByIdAsync(int id)
        {
            return await _context.EmpIndustries
                  .Where(x => x.EmpIndustryId == id)
                  .SingleOrDefaultAsync();
        }

        public async Task<EmpIndustryDto> GetEmpIndustryDtoByIdAsync(int id)
        {
            return await _context.EmpIndustries
                 .Where(x => x.EmpIndustryId == id)
                 .ProjectTo<EmpIndustryDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(EmpIndustry empIndustry)
        {
            _context.Entry(empIndustry).State = EntityState.Modified;
        }
    }
}