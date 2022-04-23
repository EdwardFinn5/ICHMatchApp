using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.AppUserId);
                users = likes.Select(like => like.LikedUser);
            }

            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == likesParams.AppUserId);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto
            {
                Username = user.UserName,
                AppUserType = user.AppUserType,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Major = user.Major,
                ClassYear = user.ClassYear,
                College = user.College,
                EmpName = user.EmpName,
                EmpIndustry = user.EmpIndustry,
                EmployeeNum = user.EmployeeNum,
                PosCategory = user.PosCategory,
                PositName = user.PositName,
                CoLocation = user.CoLocation,
                CiLocation = user.CiLocation,
                StLocation = user.StLocation,
                StudentUrl = user.Photos.FirstOrDefault(p => p.IsMain).StudentUrl,
                LogoUrl = user.Photos.FirstOrDefault(p => p.IsMainLogo).LogoUrl,
                AppUserId = user.AppUserId
            });

            return await PagedList<LikeDto>.CreateAsync(likedUsers,
                likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(x => x.LikedUsers)
            .FirstOrDefaultAsync(x => x.AppUserId == userId);
        }
    }
}