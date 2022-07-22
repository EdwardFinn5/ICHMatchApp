using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPositNameRepository
    {
        void Update(PositName positName);
        // Task<bool> SaveAllAsync();
        Task<IEnumerable<PositNameDto>> GetPositNameDtosAsync();
        Task<IEnumerable<PositNameDto>> GetPositNameDtosAsync(int id);
        Task<PositName> GetPositNameByIdAsync(int id);
        Task<PositNameDto> GetPositNameDtoByIdAsync(int id);
        void DeletePositName(PositName positName);
        Task<bool> Complete();

    }
}