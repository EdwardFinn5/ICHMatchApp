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
    public class CiempLocationRepository : ICiempLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CiempLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteCiempLocation(CiempLocation ciempLocation)
        {
            _context.CiempLocations.Remove(ciempLocation);
        }

        public async Task<CiempLocation> GetCiempLocationByIdAsync(int id)
        {
            return await _context.CiempLocations
              .Where(x => x.CiempLocationId == id)
              .SingleOrDefaultAsync();
        }

        public async Task<CiempLocationDto> GetCiempLocationDtoByIdAsync(int id)
        {
            return await _context.CiempLocations
             .Where(x => x.CiempLocationId == id)
             .ProjectTo<CiempLocationDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<CiempLocationDto>> GetCiempLocationDtosAsync(int id)
        {
            return await _context.CiempLocations
                   .Where(x => x.StempLocationId == id)
                   .OrderBy(x => x.CiempLocationSortName)
                   .ProjectTo<CiempLocationDto>(_mapper.ConfigurationProvider)
                   .ToListAsync();
        }

        public async Task<IEnumerable<CiempLocationDto>> GetCiempLocationDtosAsync()
        {
            return await _context.CiempLocations
           .OrderBy(x => x.CiempLocationSortName)
           .ProjectTo<CiempLocationDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(CiempLocation ciempLocation)
        {
            _context.Entry(ciempLocation).State = EntityState.Modified;
        }
    }
}