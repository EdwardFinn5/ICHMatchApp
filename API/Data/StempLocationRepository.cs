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
    public class StempLocationRepository : IStempLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StempLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteStempLocation(StempLocation stempLocation)
        {
            _context.StempLocations.Remove(stempLocation);
        }

        public async Task<StempLocation> GetStempLocationByIdAsync(int id)
        {
            return await _context.StempLocations
              .Where(x => x.StempLocationId == id)
              .SingleOrDefaultAsync();
        }

        public async Task<StempLocationDto> GetStempLocationDtoByIdAsync(int id)
        {
            return await _context.StempLocations
               .Where(x => x.StempLocationId == id)
               .ProjectTo<StempLocationDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }

        // public Task<IEnumerable<StempLocationDto>> GetStempLocationDtosAsync()
        // {
        //     return await _context.StempLocations
        //           .Where(x => x.CoLocationId == id)
        //           .OrderBy(x => x.StLocationSortName)
        //           .ProjectTo<StLocationDto>(_mapper.ConfigurationProvider)
        //           .ToListAsync();
        // }

        public async Task<IEnumerable<StempLocationDto>> GetStempLocationDtosAsync()
        {
            return await _context.StempLocations
                 .OrderBy(s => s.StempLocationSortName)
                 .ProjectTo<StempLocationDto>(_mapper.ConfigurationProvider)
                 .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(StempLocation stempLocation)
        {
            _context.Entry(stempLocation).State = EntityState.Modified;
        }
    }
}