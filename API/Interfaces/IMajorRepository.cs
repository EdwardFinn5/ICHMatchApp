using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IMajorRepository
    {
        void Update(Major major);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<MajorDto>> GetMajorDtosAsync(int id);
        Task<IEnumerable<MajorDto>> GetMajorDtosAsync();
        Task<MajorDto> GetMajorDtoByIdAsync(int id);
        Task<Major> GetMajorByIdAsync(int id);
        void DeleteMajor(Major major);
        Task<bool> Complete();
    }
}