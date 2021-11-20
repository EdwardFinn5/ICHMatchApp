using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IEmpInfoRepository
    {
        void Update(EmpInfo empInfo);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<EmpInfo>> GetEmpInfosAsync();
        Task<EmpInfo> GetEmpInfoByIdAsync(int id);
        // Task<StudInfo> GetStudInfoByUsernameAsync(string username);

        // added the following two methods during video 97 on automapper queryable

        Task<IEnumerable<EmpInfoDto>> GetEmpInfoDtosAsync();
        // Task<CardMemberDto> GetMemberAsync(string username);
        Task<EmpInfoDto> GetEmpInfoDtoAsync(int id);
    }
}