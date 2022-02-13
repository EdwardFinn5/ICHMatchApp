using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]

    public class SearchUsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public SearchUsersController(IUserRepository userRepository,
                                    IMapper mapper,
                                    IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;

        }

        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        // {
        //     var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());


        //     var users = await _userRepository.GetMembersAsync(userParams);

        //     Response.AddPaginationHeader(
        //         users.CurrentPage,
        //         users.PageSize,
        //         users.TotalCount,
        //         users.TotalPages,
        //         users.AppUserType);

        //     return Ok(users);

        //     // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        // }

        [HttpGet("GetByAppUserType/{appUserType}")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetByAppUserType(string appUserType)
        {
            var users = await _userRepository.GetMembersAsync(appUserType);

            return Ok(users);

            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("GetByName/{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetByName(string username)
        {
            return await _userRepository.GetMemberAsync(username);

        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<MemberDto>> GetById(int id)
        {
            return await _userRepository.GetMemberAsync(id);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                StudentUrl = null,
                LogoUrl = null
            };

            if (user.AppUserType == "ColStudent")
            {
                photo.StudentUrl = result.SecureUrl.AbsoluteUri;
                photo.PublicId = result.PublicId;
            };

            if (user.AppUserType == "EmpHr")
            {
                photo.LogoUrl = result.SecureUrl.AbsoluteUri;
                photo.PublicId = result.PublicId;
            };

            if (user.Photos.Count == 0 && user.AppUserType == "ColStudent")
            {
                photo.IsMain = true;
            }

            if (user.Photos.Count == 0 && user.AppUserType == "EmpHr")
            {
                photo.IsMainLogo = true;
            }

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
                // return _mapper.Map<PhotoDto>(photo);
                // return CreatedAtRoute("GetUser", _mapper.Map<PhotoDto>(photo));
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo)); // used 3rd overload which 
            // has the following parameters: string routename, object routeValues, object value
            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (user.AppUserType == "ColStudent")
            {
                if (photo.IsMain) return BadRequest("This is already your main photo");

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    photo.IsMain = true;
                }
            }

            if (user.AppUserType == "EmpHr")
            {
                if (photo.IsMain) return BadRequest("This is already your main logo");

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMainLogo);

                if (currentMain != null)
                {
                    currentMain.IsMainLogo = false;
                    photo.IsMainLogo = true;
                }
            }

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main image");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null)
            {
                return NotFound();
            }

            if (photo.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }

            if (photo.IsMainLogo)
            {
                return BadRequest("You cannot delete your main logo");
            }

            if (photo.IsMainHr)
            {
                return BadRequest("You cannot delete your main HR Photo");
            }

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            user.Photos.Remove(photo);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo/logo");
        }
    }
}