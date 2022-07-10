using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;


namespace API.Interfaces
{
    public interface IStudInfoRepository
    {
        void Update(StudInfo studInfo);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<StudInfo>> GetStudInfosAsync();
        Task<StudInfo> GetStudInfoByIdAsync(int id);
        Task<StudInfo> GetStudInfoByUsernameAsync(string username);

        Task<StudInfoDto> GetStudInfoDtoByIdAsync(int id);

        // added the following two methods during video 97 on automapper queryable

        Task<IEnumerable<StudInfoDto>> GetStudInfoDtosAsync();
        // Task<CardMemberDto> GetMemberAsync(string username);
        Task<StudInfoDto> GetStudInfoDtoAsync(int id);
    }
}