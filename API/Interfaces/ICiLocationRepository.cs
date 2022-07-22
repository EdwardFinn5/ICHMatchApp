using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICiLocationRepository
    {
        void Update(CiLocation ciLocation);
        // Task<bool> SaveAllAsync();
        Task<IEnumerable<CiLocationDto>> GetCiLocationDtosAsync(int id);
        // Task<IEnumerable<CiLocationDto>> GetCiLocationOtherCCIdDtosAsync(int id);
        Task<IEnumerable<CiLocationDto>> GetCiLocationDtosAsync();
        Task<CiLocationDto> GetCiLocationDtoByIdAsync(int id);
        Task<CiLocation> GetCiLocationByIdAsync(int id);
        void DeleteCiLocation(CiLocation ciLocation);
        Task<bool> Complete();
    }
}