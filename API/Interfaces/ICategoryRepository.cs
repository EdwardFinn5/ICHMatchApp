using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
        void Update(Category category);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<CategoryDto> GetCategoryDtoByIdAsync(int id);
        void DeleteCategory(Category category);
        Task<bool> Complete();
    }
}