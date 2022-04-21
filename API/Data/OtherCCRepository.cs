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

    public class OtherCCRepository : IOtherCCRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OtherCCRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteOtherCC(OtherCC otherCC)
        {
            _context.OtherCCs.Remove(otherCC);
        }

        public async Task<OtherCC> GetOtherCCByIdAsync(int id)
        {
            return await _context.OtherCCs
            .Where(x => x.OtherCCId == id)
            .SingleOrDefaultAsync();
        }

        public async Task<OtherCCDto> GetOtherCCDtoByIdAsync(int id)
        {
            return await _context.OtherCCs
             .Where(x => x.OtherCCId == id)
             .ProjectTo<OtherCCDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<OtherCCDto>> GetOtherCCDtosAsync(int id)
        {
            return await _context.OtherCCs
                   .Where(x => x.CoLocationId == id)
                   .ProjectTo<OtherCCDto>(_mapper.ConfigurationProvider)
                   .ToListAsync();
        }

        public async Task<IEnumerable<OtherCCDto>> GetOtherCCDtosAsync()
        {
            return await _context.OtherCCs
                .ProjectTo<OtherCCDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(OtherCC otherCC)
        {
            _context.Entry(otherCC).State = EntityState.Modified;
        }
    }
}