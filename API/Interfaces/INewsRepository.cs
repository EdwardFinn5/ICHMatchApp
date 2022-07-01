using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.DTOs;

namespace API.Interfaces
{
    public interface INewsRepository
    {
        void Update(News news);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<NewsDto>> GetNewsDtosAsync();
        Task<NewsDto> GetNewsDtoByIdAsync(int id);
        Task<News> GetNewsByIdAsync(int id);
        void DeleteNews(News news);
        Task<bool> Complete();
    }
}