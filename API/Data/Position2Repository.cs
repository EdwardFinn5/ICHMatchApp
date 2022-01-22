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
                 //   .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
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
                  .Where(x => x.AppUserId == id)
                  .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
                  .ToListAsync();
        }

        public async Task<IEnumerable<PositionDto>> GetPositionDtosAsync()
        {
            return await _context.Positions
            .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions
                  .Include(a => a.AppUser)
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