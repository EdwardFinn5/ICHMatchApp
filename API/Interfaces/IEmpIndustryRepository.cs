using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IEmpIndustryRepository
    {
        void Update(EmpIndustry empIndustry);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<EmpIndustryDto>> GetEmpIndustriesAsync();
        Task<EmpIndustry> GetEmpIndustryByIdAsync(int id);
        Task<EmpIndustryDto> GetEmpIndustryDtoByIdAsync(int id);
        void DeleteEmpIndustry(EmpIndustry empIndustry);
        Task<bool> Complete();
    }
}