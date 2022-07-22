using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IStLocationRepository
    {
        void Update(StLocation stLocation);
        // Task<bool> SaveAllAsync();
        Task<IEnumerable<StLocationDto>> GetStLocationDtosAsync(int id);
        Task<IEnumerable<StLocationDto>> GetStLocationDtosAsync();
        Task<StLocationDto> GetStLocationDtoByIdAsync(int id);
        Task<StLocation> GetStLocationByIdAsync(int id);
        void DeleteStLocation(StLocation stLocation);
        Task<bool> Complete();
    }
}