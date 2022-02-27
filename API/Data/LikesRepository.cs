using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.LikedUser);
            }

            if (predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(user => new LikeDto
            {
                Username = user.UserName,
                AppUserType = user.AppUserType,
                FirstName = user.FirstName,
                Major = user.Major,
                EmpName = user.EmpName,
                StudentUrl = user.Photos.FirstOrDefault(p => p.IsMain).StudentUrl,
                LogoUrl = user.Photos.FirstOrDefault(p => p.IsMainLogo).LogoUrl,
                Id = user.AppUserId

            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(x => x.LikedUsers)
            .FirstOrDefaultAsync(x => x.AppUserId == userId);
        }
    }
}