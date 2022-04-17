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
    public class CiLocationRepository : ICiLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CiLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteCiLocation(CiLocation ciLocation)
        {
            _context.CiLocations.Remove(ciLocation);
        }

        public async Task<CiLocation> GetCiLocationByIdAsync(int id)
        {
            return await _context.CiLocations
              .Where(x => x.CiLocationId == id)
              .SingleOrDefaultAsync();
        }

        public async Task<CiLocationDto> GetCiLocationDtoByIdAsync(int id)
        {
            return await _context.CiLocations
             .Where(x => x.CiLocationId == id)
             .ProjectTo<CiLocationDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<CiLocationDto>> GetCiLocationDtosAsync(int id)
        {
            return await _context.CiLocations
                   .Where(x => x.StLocationId == id)
                   .ProjectTo<CiLocationDto>(_mapper.ConfigurationProvider)
                   .ToListAsync();
        }

        public async Task<IEnumerable<CiLocationDto>> GetCiLocationDtosAsync()
        {
            return await _context.CiLocations
           .ProjectTo<CiLocationDto>(_mapper.ConfigurationProvider)
           .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(CiLocation ciLocation)
        {
            _context.Entry(ciLocation).State = EntityState.Modified;
        }
    }
}