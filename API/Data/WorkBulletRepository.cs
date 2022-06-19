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
    public class WorkBulletRepository : IWorkBulletRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WorkBulletRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteWorkBullet(WorkBullet workBullet)
        {
            _context.WorkBullets.Remove(workBullet);
        }

        public async Task<WorkBullet> GetWorkBulletByIdAsync(int id)
        {
            return await _context.WorkBullets
                  .Where(x => x.WorkBulletId == id)
                  .SingleOrDefaultAsync();
        }

        public async Task<WorkBulletDto> GetWorkBulletDtoByIdAsync(int id)
        {
            return await _context.WorkBullets
              .Where(x => x.WorkBulletId == id)
              .ProjectTo<WorkBulletDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<WorkBulletDto>> GetWorkBulletDtosByStudInfoIdAsync(int id)
        {
            return await _context.WorkBullets
                .Where(x => x.StudInfoId == id)
                .ProjectTo<WorkBulletDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Order)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(WorkBullet workBullet)
        {
            _context.Entry(workBullet).State = EntityState.Modified;
        }
    }
}