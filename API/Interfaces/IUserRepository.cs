using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        // added the following two methods during video 97 on automapper queryable

        // Task<IEnumerable<MemberDto>> GetMembersAsync(); changes to below after pagination
        // Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        // Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams, string appUserType);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<PagedList<MemberDto>> GetEmpMembersAsync(UserParams userParams);

        Task<IEnumerable<MemberDto>> GetEdsEmpMembersAsync();
        Task<IEnumerable<MemberDto>> GetEdsStudentMembersAsync();

        Task<MemberDto> GetMemberAsync(string username);
        Task<MemberDto> GetMemberAsync(int id);

        void DeleteMember(AppUser appUser);
        Task<bool> Complete();
    }
}