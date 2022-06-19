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
    public class DutyBulletRepository : IDutyBulletRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DutyBulletRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteDutyBullet(DutyBullet dutyBullet)
        {
            _context.DutyBullets.Remove(dutyBullet);
        }

        public async Task<DutyBullet> GetDutyBulletByIdAsync(int id)
        {
            return await _context.DutyBullets
                 .Where(x => x.DutyBulletId == id)
                 .SingleOrDefaultAsync();
        }

        public async Task<DutyBulletDto> GetDutyBulletDtoByIdAsync(int id)
        {
            return await _context.DutyBullets
              .Where(x => x.DutyBulletId == id)
              .ProjectTo<DutyBulletDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DutyBulletDto>> GetDutyBulletDtosByPositionIdAsync(int id)
        {
            return await _context.DutyBullets
                  .Where(x => x.PositionId == id)
                  .ProjectTo<DutyBulletDto>(_mapper.ConfigurationProvider)
                  .OrderBy(x => x.Order)
                  .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(DutyBullet dutyBullet)
        {
            _context.Entry(dutyBullet).State = EntityState.Modified;
        }
    }
}