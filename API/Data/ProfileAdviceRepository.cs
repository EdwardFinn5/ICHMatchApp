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
    public class ProfileAdviceRepository : IProfileAdviceRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProfileAdviceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteProfileAdvice(ProfileAdvice profileAdvice)
        {
            _context.ProfileAdvices.Remove(profileAdvice);
        }

        public async Task<ProfileAdvice> GetProfileAdviceByIdAsync(int id)
        {
            return await _context.ProfileAdvices
               .Where(x => x.ProfileAdviceId == id)
               .SingleOrDefaultAsync();
        }

        public async Task<ProfileAdviceDto> GetProfileAdviceDtoByIdAsync(int id)
        {
            return await _context.ProfileAdvices
                  .Where(x => x.ProfileAdviceId == id)
                  .ProjectTo<ProfileAdviceDto>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ProfileAdviceDto>> GetProfileAdvicesAsync()
        {
            return await _context.ProfileAdvices
            .ProjectTo<ProfileAdviceDto>(_mapper.ConfigurationProvider)
            .OrderBy(a => a.Order)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ProfileAdvice profileAdvice)
        {
            _context.Entry(profileAdvice).State = EntityState.Modified;
        }
    }
}