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
    public class AcBulletRepository : IAcBulletRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AcBulletRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteAcBullet(AcBullet acBullet)
        {
            _context.AcBullets.Remove(acBullet);
        }

        public async Task<AcBullet> GetAcBulletByIdAsync(int id)
        {
            return await _context.AcBullets
                  .Where(x => x.AcBulletId == id)
                  .SingleOrDefaultAsync();
        }

        public async Task<AcBulletDto> GetAcBulletDtoByIdAsync(int id)
        {
            return await _context.AcBullets
              .Where(x => x.AcBulletId == id)
              .ProjectTo<AcBulletDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AcBulletDto>> GetAcBulletDtosByStudInfoIdAsync(int id)
        {
            return await _context.AcBullets
                .Where(x => x.StudInfoId == id)
                .ProjectTo<AcBulletDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Order)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AcBullet acBullet)
        {
            _context.Entry(acBullet).State = EntityState.Modified;
        }
    }
}