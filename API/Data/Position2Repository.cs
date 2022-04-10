using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Position2Repository : IPosition2Repository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Position2Repository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeletePosition(Position position)
        {
            _context.Positions.Remove(position);
        }

        public async Task<Position> GetPositionByIdAsync(int id)
        {
            return await _context.Positions
                 .Where(x => x.PositionId == id)
                 .SingleOrDefaultAsync();
        }

        public async Task<PositionDto> GetPositionDtoByIdAsync(int id)
        {
            return await _context.Positions
               .Where(x => x.PositionId == id)
               .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<PositionDto>> GetPositionDtosAsync(int id)
        {
            return await _context.Positions
                  // .Include(u => u.DutyBullets)
                  .Where(x => x.AppUserId == id)
                  .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                  .ToListAsync();
        }

        public async Task<PagedList<PositionDto>> GetPositionDtosAsync(UserParams userParams)
        {
            var query = _context.Positions.AsQueryable();

            if (userParams.PositionName != null)
            {
                query = query.Where(p => p.PositionName == userParams.PositionName);
            }
            if (userParams.PositionType != null)
            {
                query = query.Where(p => p.PositionType == userParams.PositionType);
            }
            if (userParams.PositionLocation != null)
            {
                query = query.Where(p => p.PositionLocation == userParams.PositionLocation);
            }

            if (userParams.OrderByPositionName != null)
            {
                query = query.OrderBy(p => p.PositionName)
                .ThenBy(p => p.RegisterCode);
            }
            else if (userParams.OrderByPositionLocation != null)
            {
                query = query.OrderBy(p => p.PositionLocation)
                .ThenBy(p => p.PositionLocation);
            }
            else
            {
                query = query.OrderBy(p => p.RegisterCode)
                .ThenBy(p => p.PositionName);
            }


            return await PagedList<PositionDto>.CreateAsync(
                 query.ProjectTo<PositionDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions
                  .Include(a => a.AppUser)
                  .Include(b => b.DutyBullets)
                  .Include(b => b.SkillsBullets)
                  .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Position position)
        {
            _context.Entry(position).State = EntityState.Modified;
        }
    }
}