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
    public class EmpInfoRepository : IEmpInfoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmpInfoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<EmpInfo> GetEmpInfoByIdAsync(int id)
        {
            return await _context.EmpInfos
                .Where(x => x.AppUserId == id)
                // .ProjectTo<StudInfoDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<EmpInfoDto> GetEmpInfoDtoAsync(int id)
        {
            return await _context.EmpInfos
                  .Where(x => x.AppUserId == id)
                  .ProjectTo<EmpInfoDto>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<EmpInfoDto>> GetEmpInfoDtosAsync()
        {
            return await _context.EmpInfos
              .ProjectTo<EmpInfoDto>(_mapper.ConfigurationProvider)
              .ToListAsync();
        }

        public async Task<IEnumerable<EmpInfo>> GetEmpInfosAsync()
        {
            return await _context.EmpInfos
                .Include(a => a.AppUser)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(EmpInfo empInfo)
        {
            _context.Entry(empInfo).State = EntityState.Modified;
        }
    }
}