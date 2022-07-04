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
    public class CardUserRepository : ICardUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CardUserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<CardMemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<CardMemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<CardMemberDto> GetMemberIdAsync(int id)
        {
            return await _context.Users
               .Where(x => x.AppUserId == id)
               .ProjectTo<CardMemberDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
        }

        // public async Task<PagedList<CardMemberDto>> GetMembersAsync(UserParams userParams)
        // {
        //     var query = _context.Users
        //         .Where(x => x.AppUserType == "EmpHr")
        //         .ProjectTo<CardMemberDto>(_mapper.ConfigurationProvider)
        //         .AsNoTracking();
        //     return await PagedList<CardMemberDto>.CreateAsync(
        //         query,
        //         userParams.PageNumber,
        //         userParams.PageSize
        //     );
        // }
        public async Task<PagedList<CardMemberDto>> GetStudentMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.AppUserType == "ColStudent" && u.IsActive);

            if (userParams.Major != null)
            {
                query = query.Where(u => u.Major == userParams.Major);
            }
            if (userParams.Category != null)
            {
                query = query.Where(u => u.Category == userParams.Category);
            }

            if (userParams.College != null)
            {
                query = query.Where(u => u.College == userParams.College);
            }
            if (userParams.ClassYear != null)
            {
                query = query.Where(u => u.ClassYear == userParams.ClassYear);
            }

            query = query.OrderBy(u => u.Major)
                .ThenBy(u => u.FirstName);

            return await PagedList<CardMemberDto>.CreateAsync(
                query.ProjectTo<CardMemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }

        public async Task<PagedList<CardMemberDto>> GetEmpMembersAsync(UserParams userParams)
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
            else
            {
                query = query.OrderBy(u => u.RegisterCode)
                    .ThenBy(u => u.EmpName);
            }

            return await PagedList<CardMemberDto>.CreateAsync(
                query.ProjectTo<CardMemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
            );
        }

        public async Task<IEnumerable<CardMemberDto>> GetEmpMembersAsync()
        {
            return await _context.Users
                .Where(x => x.AppUserType == "EmpHr")
                .ProjectTo<CardMemberDto>(_mapper.ConfigurationProvider)
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
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
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
    }
}