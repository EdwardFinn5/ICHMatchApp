using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IStempLocationRepository
    {
        void Update(StempLocation stempLocation);
        Task<bool> SaveAllAsync();
        // Task<IEnumerable<StempLocationDto>> GetStempLocationDtosAsync(int id);
        Task<IEnumerable<StempLocationDto>> GetStempLocationDtosAsync();
        Task<StempLocationDto> GetStempLocationDtoByIdAsync(int id);
        Task<StempLocation> GetStempLocationByIdAsync(int id);
        void DeleteStempLocation(StempLocation stempLocation);
        Task<bool> Complete();
    }
}