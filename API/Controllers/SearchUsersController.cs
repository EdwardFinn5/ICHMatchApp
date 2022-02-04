using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

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
    }
}