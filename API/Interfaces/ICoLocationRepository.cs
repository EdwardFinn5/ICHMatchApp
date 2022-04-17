using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICoLocationRepository
    {
        void Update(CoLocation coLocation);
        Task<bool> SaveAllAsync();
        // Task<IEnumerable<CoLocationDto>> GetCoLocationDtosAsync(int id);
        Task<IEnumerable<CoLocationDto>> GetCoLocationDtosAsync();
        Task<CoLocationDto> GetCoLocationDtoByIdAsync(int id);
        Task<CoLocation> GetCoLocationByIdAsync(int id);
        void DeleteCoLocation(CoLocation coLocation);
        Task<bool> Complete();
    }
}