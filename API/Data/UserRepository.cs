using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // public async Task<MemberDto> GetMemberAsync(string username)
        // {
        //     return await _context.Users
        //         .Where(x => x.UserName == username)
        //         .Include(p => p.Photos)
        //         .Include(s => s.StudInfos)
        //         .Include(e => e.EmpInfos)
        //         .Include(j => j.Positions)
        //         .Select(user => new MemberDto
        //         {
        //             AppUserId = user.AppUserId,
        //             Username = user.UserName
        //         }).SingleOrDefaultAsync();
        // }

        // public async Task<MemberDto> GetMemberAsync(string username)
        // {
        //     return await _context.Users
        //         .Where(x => x.UserName == username)
        //         .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        //         .SingleOrDefaultAsync();
        // }

        // public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams, string appUserType)
        // {
        //     var query = _context.Users
        //         .Where(x => x.AppUserType == appUserType)
        //         .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        //         .AsNoTracking();

        //     return await PagedList<MemberDto>.CreateAsync(
        //         query,
        //         userParams.PageNumber,
        //         userParams.PageSize
        //     );
        // }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.AppUserType == "ColStudent" && u.IsActive);

            if (userParams.Major != null)
            {
                query = query.Where(u => u.Major == userParams.Major);
            }
            if (userParams.College != null)
            {
                query = query.Where(u => u.College == userParams.College);
            }
            if (userParams.Category != null)
            {
                query = query.Where(u => u.Category == userParams.Category);
            }
            if (userParams.CoLocation != null)
            {
                query = query.Where(u => u.CoLocation == userParams.CoLocation);
            }
            if (userParams.StLocation != null)
            {
                query = query.Where(u => u.StLocation == userParams.StLocation);
            }
            if (userParams.CiLocation != null)
            {
                query = query.Where(u => u.CiLocation == userParams.CiLocation);
            }
            if (userParams.ClassYear != null)
            {
                query = query.Where(u => u.ClassYear == userParams.ClassYear);
            }

            // if (userParams.OrderByLastActive != null)
            // {
            //     query = query.OrderByDescending(u => u.LastActive);
            // }

            if (userParams.OrderByMajor != null)
            {
                query = query.OrderBy(u => u.Major)
                .ThenBy(u => u.LastName);
            }

            else if (userParams.OrderByCiLocation != null)
            {
                query = query.OrderBy(u => u.CiLocation)
                .ThenBy(u => u.LastName);
            }
            else
            {
                query = query.OrderBy(u => u.LastName);
            }

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }

        public async Task<PagedList<MemberDto>> GetAdminStudentsAsync(UserParams userParams, string college)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.AppUserType == "ColStudent" && u.IsActive && u.College == college);

            if (userParams.Major != null)
            {
                query = query.Where(u => u.Major == userParams.Major);
            }
            if (userParams.Category != null)
            {
                query = query.Where(u => u.Category == userParams.Category);
            }
            if (userParams.CoLocation != null)
            {
                query = query.Where(u => u.CoLocation == userParams.CoLocation);
            }
            if (userParams.StLocation != null)
            {
                query = query.Where(u => u.StLocation == userParams.StLocation);
            }
            if (userParams.CiLocation != null)
            {
                query = query.Where(u => u.CiLocation == userParams.CiLocation);
            }
            if (userParams.ClassYear != null)
            {
                query = query.Where(u => u.ClassYear == userParams.ClassYear);
            }

            // if (userParams.OrderByLastActive != null)
            // {
            //     query = query.OrderByDescending(u => u.LastActive);
            // }

            if (userParams.OrderByMajor != null)
            {
                query = query.OrderBy(u => u.Major)
                .ThenBy(u => u.LastName);
            }

            else if (userParams.OrderByCiempLocation != null)
            {
                query = query.OrderBy(u => u.CiLocation)
                .ThenBy(u => u.LastName);
            }
            else
            {
                query = query.OrderBy(u => u.LastName);
            }

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }

        public async Task<IEnumerable<MemberDto>> GetEdsStudentMembersAsync()
        {
            return await _context.Users
                .Where(x => x.AppUserType == "ColStudent")
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .OrderBy(u => u.College)
                    .ThenBy(u => u.Username)
                .ToListAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetEdsEmpMembersAsync()
        {
            return await _context.Users
                .Where(x => x.AppUserType == "EmpHr")
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .OrderBy(u => u.EmpName)
                .ToListAsync();
        }

        public async Task<PagedList<MemberDto>> GetEmpMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.AppUserType == "EmpHr" && u.IsActive);

            if (userParams.EmpIndustry != null)
            {
                query = query.Where(u => u.EmpIndustry == userParams.EmpIndustry);
            }
            if (userParams.CiempLocation != null)
            {
                query = query.Where(u => u.CiempLocation == userParams.CiempLocation);
            }

            if (userParams.OrderByEmpName != null)
            {
                query = query.OrderBy(u => u.EmpName);
            }

            else if (userParams.OrderByCiempLocation != null)
            {
                query = query.OrderBy(u => u.CiempLocation);
            }
            else
            {
                query = query.OrderBy(u => u.RegisterCode)
                    .ThenBy(u => u.EmpName);
            }

            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }


        // public async Task<IEnumerable<MemberDto>> GetEmployeeMembersAsync()
        // {
        //     return await _context.Users
        //         .Where(x => x.AppUserType == "EmpHr")
        //         .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        //         .ToListAsync();
        // }


        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(h => h.PhotoHrs)
            .Include(s => s.StudInfos)
            .Include(e => e.EmpInfos)
            .Include(j => j.Positions)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(h => h.PhotoHrs)
            .Include(s => s.StudInfos)
            .Include(e => e.EmpInfos)
            .Include(j => j.Positions)
            .ToListAsync();
        }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0;
        // }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<MemberDto> GetMemberAsync(int id)
        {
            return await _context.Users
                .Where(x => x.AppUserId == id)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync(string appUserType)
        {
            return await _context.Users
                .Where(x => x.AppUserType == appUserType)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                 .Where(x => x.UserName == username)
                 .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public void DeleteMember(AppUser appUser)
        {
            _context.Users.Remove(appUser);
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}