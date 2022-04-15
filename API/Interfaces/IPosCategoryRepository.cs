using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPosCategoryRepository
    {
        void Update(PosCategory posCategory);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<PosCategoryDto>> GetPosCategoriesAsync();
        Task<PosCategory> GetPosCategoryByIdAsync(int id);
        Task<PosCategoryDto> GetPosCategoryDtoByIdAsync(int id);
        void DeletePosCategory(PosCategory posCategory);
        Task<bool> Complete();
    }
}