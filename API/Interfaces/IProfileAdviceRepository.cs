using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProfileAdviceRepository
    {
        void Update(ProfileAdvice profileAdvice);
        // Task<bool> SaveAllAsync();
        Task<IEnumerable<ProfileAdviceDto>> GetProfileAdvicesAsync();
        Task<ProfileAdvice> GetProfileAdviceByIdAsync(int id);
        Task<ProfileAdviceDto> GetProfileAdviceDtoByIdAsync(int id);
        void DeleteProfileAdvice(ProfileAdvice profileAdvice);
        Task<bool> Complete();
    }
}