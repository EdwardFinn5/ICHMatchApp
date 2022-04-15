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
    public class PosCategoryRepository : IPosCategoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PosCategoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeletePosCategory(PosCategory posCategory)
        {
            _context.PosCategories.Remove(posCategory);
        }

        public async Task<IEnumerable<PosCategoryDto>> GetPosCategoriesAsync()
        {
            return await _context.PosCategories
            .ProjectTo<PosCategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<PosCategory> GetPosCategoryByIdAsync(int id)
        {
            return await _context.PosCategories
             .Where(x => x.PosCategoryId == id)
            // .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<PosCategoryDto> GetPosCategoryDtoByIdAsync(int id)
        {
            return await _context.PosCategories
                 .Where(x => x.PosCategoryId == id)
                 .ProjectTo<PosCategoryDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(PosCategory posCategory)
        {
            _context.Entry(posCategory).State = EntityState.Modified;
        }
    }
}