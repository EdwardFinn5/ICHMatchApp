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
    public class LocationRepository : ILocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteLocation(Location location)
        {
            _context.Locations.Remove(location);
        }

        public async Task<Location> GetLocationByIdAsync(int id)
        {
            return await _context.Locations
            .Where(x => x.LocationId == id)
           // .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
           .SingleOrDefaultAsync();
        }

        public async Task<LocationDto> GetLocationDtoByIdAsync(int id)
        {
            return await _context.Locations
                 .Where(x => x.LocationId == id)
                 .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<LocationDto>> GetLocationsAsync()
        {
            return await _context.Locations
            .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Location location)
        {
            _context.Entry(location).State = EntityState.Modified;
        }
    }
}