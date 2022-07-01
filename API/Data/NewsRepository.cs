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

    public class NewsRepository : INewsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NewsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteNews(News news)
        {
            _context.Newses.Remove(news);
        }

        public async Task<News> GetNewsByIdAsync(int id)
        {
            return await _context.Newses
                .Where(x => x.NewsId == id)
                .SingleOrDefaultAsync();
        }

        public async Task<NewsDto> GetNewsDtoByIdAsync(int id)
        {
            return await _context.Newses
              .Where(x => x.NewsId == id)
              .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync();
        }

        // public Task<NewsDto> GetNewsDtoByIdAsync()
        // {
        //     throw new NotImplementedException();
        // }

        public async Task<IEnumerable<NewsDto>> GetNewsDtosAsync()
        {
            return await _context.Newses
                  //   .Where(x => x.IsActive)
                  .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
                  .OrderBy(x => x.Order)
                  .ToListAsync();
        }

        // public Task<IEnumerable<NewsDto>> GetNewsDtosAsync(int id)
        // {
        //     throw new NotImplementedException();
        // }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(News news)
        {
            _context.Entry(news).State = EntityState.Modified;
        }
    }
}
