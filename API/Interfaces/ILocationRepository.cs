using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ILocationRepository
    {
        void Update(Location location);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<LocationDto>> GetLocationsAsync();
        Task<Location> GetLocationByIdAsync(int id);
        Task<LocationDto> GetLocationDtoByIdAsync(int id);
        void DeleteLocation(Location location);
        Task<bool> Complete();
    }
}