using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICardUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        // added the following two methods during video 97 on automapper queryable

        Task<PagedList<CardMemberDto>> GetMembersAsync(UserParams userParams);
        Task<PagedList<CardMemberDto>> GetStudentMembersAsync(UserParams userParams, string appUserType);
        Task<IEnumerable<CardMemberDto>> GetEmpMembersAsync();

        Task<CardMemberDto> GetMemberAsync(string username);
        Task<CardMemberDto> GetMemberIdAsync(int id);
    }
}