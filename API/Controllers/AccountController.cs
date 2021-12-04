using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("RegisterStud")]
        public async Task<ActionResult<UserDto>> RegisterStud(RegisterStudDto registerStudDto)
        {
            if (await UserExists(registerStudDto.Username)) return BadRequest("Username is taken");

            // var colUser = _mapper.Map<ColUser>(hsRegisterDto);

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                AppUserId = registerStudDto.AppUserId,
                UserName = registerStudDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerStudDto.Password)),
                PasswordSalt = hmac.Key,
                AppUserType = "ColStudent"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "ColStudent",
                FirstName = user.FirstName,
            };
        }

        [HttpPost("RegisterEmp")]
        public async Task<ActionResult<UserDto>> RegisterEmp(RegisterEmpDto registerEmpDto)
        {
            if (await UserExists(registerEmpDto.Username)) return BadRequest("Username is taken");

            // var colUser = _mapper.Map<ColUser>(hsRegisterDto);

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerEmpDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerEmpDto.Password)),
                PasswordSalt = hmac.Key,
                AppUserType = "EmpHr"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "EmpHr",
                FirstName = user.FirstName,
                EmpName = user.EmpName
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                FirstName = user.FirstName,
                Token = _tokenService.CreateToken(user),
                AppUserType = user.AppUserType,
                EmpName = user.EmpName,
                StudentUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.StudentUrl,
                LogoUrl = user.Photos.FirstOrDefault(x => x.IsMainLogo)?.LogoUrl,
                HrUrl = user.Photos.FirstOrDefault(x => x.IsMainHr)?.HrUrl
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}