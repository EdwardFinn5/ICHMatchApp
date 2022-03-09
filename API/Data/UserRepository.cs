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

            query = query.Where(u => u.AppUserType == "ColStudent");

            if (userParams.Major != null)
            {
                query = query.Where(u => u.Major == userParams.Major);
            }
            if (userParams.Location != null)
            {
                query = query.Where(u => u.Location == userParams.Location);
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

            else if (userParams.OrderByLocation != null)
            {
                query = query.OrderBy(u => u.Location)
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

        public async Task<IEnumerable<MemberDto>> GetStudentMembersAsync()
        {
            return await _context.Users
                .Where(x => x.AppUserType == "ColStudent")
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<MemberDto>> GetEmpMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.AppUserType == "EmpHr");

            if (userParams.EmpIndustry != null)
            {
                query = query.Where(u => u.EmpIndustry == userParams.EmpIndustry);
            }
            if (userParams.Location != null)
            {
                query = query.Where(u => u.Location == userParams.Location);
            }

            if (userParams.OrderByEmpName != null)
            {
                query = query.OrderBy(u => u.EmpName);
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


        public async Task<IEnumerable<MemberDto>> GetEmployeeMembersAsync()
        {
            return await _context.Users
                .Where(x => x.AppUserType == "EmpHr")
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }


        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(s => s.StudInfos)
            .Include(e => e.EmpInfos)
            .Include(j => j.Positions)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .Include(s => s.StudInfos)
            .Include(e => e.EmpInfos)
            .Include(j => j.Positions)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

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
    }
}