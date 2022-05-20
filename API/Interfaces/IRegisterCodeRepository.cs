using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IRegisterCodeRepository
    {
        void Update(RegisterCode registercode);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<RegisterCodeDto>> GetRegisterCodesAsync();
        Task<RegisterCode> GetRegisterCodeByIdAsync(int id);
        Task<RegisterCodeDto> GetRegisterCodeDtoByIdAsync(int id);
        void DeleteRegisterCode(RegisterCode registerCode);
        Task<bool> Complete();
    }
}