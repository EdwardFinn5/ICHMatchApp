using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IOtherCCRepository
    {
        void Update(OtherCC otherCC);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<OtherCCDto>> GetOtherCCDtosAsync(int id);
        Task<IEnumerable<OtherCCDto>> GetOtherCCDtosAsync();
        Task<OtherCCDto> GetOtherCCDtoByIdAsync(int id);
        Task<OtherCC> GetOtherCCByIdAsync(int id);
        void DeleteOtherCC(OtherCC otherCC);
        Task<bool> Complete();
    }
}