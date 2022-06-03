using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICiempLocationRepository
    {
        void Update(CiempLocation ciempLocation);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<CiempLocationDto>> GetCiempLocationDtosAsync(int id);
        // Task<IEnumerable<CiLocationDto>> GetCiLocationOtherCCIdDtosAsync(int id);
        Task<IEnumerable<CiempLocationDto>> GetCiempLocationDtosAsync();
        Task<CiempLocationDto> GetCiempLocationDtoByIdAsync(int id);
        Task<CiempLocation> GetCiempLocationByIdAsync(int id);
        void DeleteCiempLocation(CiempLocation ciempLocation);
        Task<bool> Complete();
    }
}