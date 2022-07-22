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
    public class StLocationRepository : IStLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public StLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteStLocation(StLocation stLocation)
        {
            _context.StLocations.Remove(stLocation);
        }

        public async Task<StLocation> GetStLocationByIdAsync(int id)
        {
            return await _context.StLocations
             .Where(x => x.StLocationId == id)
             .SingleOrDefaultAsync();
        }

        public async Task<StLocationDto> GetStLocationDtoByIdAsync(int id)
        {
            return await _context.StLocations
              .Where(x => x.StLocationId == id)
              .ProjectTo<StLocationDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<StLocationDto>> GetStLocationDtosAsync(int id)
        {
            return await _context.StLocations
                   .Where(x => x.CoLocationId == id)
                   .OrderBy(x => x.StLocationSortName)
                   .ProjectTo<StLocationDto>(_mapper.ConfigurationProvider)
                   .ToListAsync();
        }

        public async Task<IEnumerable<StLocationDto>> GetStLocationDtosAsync()
        {
            return await _context.StLocations
                .OrderBy(s => s.StLocationSortName)
                .ProjectTo<StLocationDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(StLocation stLocation)
        {
            _context.Entry(stLocation).State = EntityState.Modified;
        }
    }
}