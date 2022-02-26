using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;
        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _likesRepository = likesRepository;
            _userRepository = userRepository;
        }

        [HttpPost("AddByName/{username}")]
        public async Task<ActionResult> AddByName(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot thumbs-up yourself");

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.AppUserId);

            if (userLike != null) return BadRequest("You have already given a thumbs-up to this user");

            userLike = new Entities.UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.AppUserId
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to give a thumbs-up to user");
        }

        [HttpPost("AddById/{id}")]
        public async Task<ActionResult> AddById(int id)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByIdAsync(id);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.AppUserId == id) return BadRequest("You cannot thumbs-up yourself");

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.AppUserId);

            if (userLike != null) return BadRequest("You have already given a thumbs-up to this user");

            userLike = new Entities.UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.AppUserId
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to give a thumbs-up to user");
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes(string predicate)
        {
            var users = await _likesRepository.GetUserLikes(predicate, User.GetUserId());

            return Ok(users);
        }
    }
}