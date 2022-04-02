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
    public class SkillsBulletRepository : ISkillsBulletRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SkillsBulletRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteSkillsBullet(SkillsBullet skillsBullet)
        {
            _context.SkillsBullets.Remove(skillsBullet);
        }

        public async Task<SkillsBullet> GetSkillsBulletByIdAsync(int id)
        {
            return await _context.SkillsBullets
                 .Where(x => x.SkillsBulletId == id)
                 .SingleOrDefaultAsync();
        }

        public async Task<SkillsBulletDto> GetSkillsBulletDtoByIdAsync(int id)
        {
            return await _context.SkillsBullets
              .Where(x => x.SkillsBulletId == id)
              .ProjectTo<SkillsBulletDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<SkillsBulletDto>> GetSkillsBulletDtosByPositionIdAsync(int id)
        {
            return await _context.SkillsBullets
                  .Where(x => x.PositionId == id)
                  .ProjectTo<SkillsBulletDto>(_mapper.ConfigurationProvider)
                  .OrderBy(x => x.Order)
                  .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(SkillsBullet skillsBullet)
        {
            _context.Entry(skillsBullet).State = EntityState.Modified;
        }
    }
}