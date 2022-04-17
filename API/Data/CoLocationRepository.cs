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
    public class CoLocationRepository : ICoLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CoLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteCoLocation(CoLocation coLocation)
        {
            _context.CoLocations.Remove(coLocation);
        }

        public async Task<CoLocation> GetCoLocationByIdAsync(int id)
        {
            return await _context.CoLocations
             .Where(x => x.CoLocationId == id)
             .SingleOrDefaultAsync();
        }

        public async Task<CoLocationDto> GetCoLocationDtoByIdAsync(int id)
        {
            return await _context.CoLocations
              .Where(x => x.CoLocationId == id)
              .ProjectTo<CoLocationDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        // public async Task<IEnumerable<CoLocationDto>> GetCoLocationDtosAsync(int id)
        // {
        //     return await _context.CoLocations
        //           .Where(x => x.CoLocationId == id)
        //           .ProjectTo<CoLocationDto>(_mapper.ConfigurationProvider)
        //           .ToListAsync();
        // }

        public async Task<IEnumerable<CoLocationDto>> GetCoLocationDtosAsync()
        {
            return await _context.CoLocations
           .ProjectTo<CoLocationDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(CoLocation coLocation)
        {
            _context.Entry(coLocation).State = EntityState.Modified;
        }
    }
}