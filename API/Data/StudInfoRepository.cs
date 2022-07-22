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
    public class StudInfoRepository : IStudInfoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StudInfoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<StudInfo> GetStudInfoByIdAsync(int id)
        {
            return await _context.StudInfos
                .Where(x => x.AppUserId == id)
                // .ProjectTo<StudInfoDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public Task<StudInfo> GetStudInfoByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        // public async Task<StudInfo> GetStudInfoByUsernameAsync(string studinfoname)
        // {
        //     return await _context.StudInfos
        // }

        public async Task<StudInfoDto> GetStudInfoDtoAsync(int id)
        {
            return await _context.StudInfos
                 .Where(x => x.AppUserId == id)
                 .ProjectTo<StudInfoDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public async Task<StudInfoDto> GetStudInfoDtoByIdAsync(int id)
        {
            return await _context.StudInfos
               .Where(x => x.StudInfoId == id)
               .ProjectTo<StudInfoDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<StudInfoDto>> GetStudInfoDtosAsync()
        {
            return await _context.StudInfos
               .ProjectTo<StudInfoDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public async Task<IEnumerable<StudInfo>> GetStudInfosAsync()
        {
            return await _context.StudInfos
            .Include(a => a.AppUser)
            .ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(StudInfo studInfo)
        {
            _context.Entry(studInfo).State = EntityState.Modified;
        }
    }
}