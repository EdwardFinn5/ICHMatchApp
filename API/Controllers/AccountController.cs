using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("RegisterStud")]
        public async Task<ActionResult<UserDto>> RegisterStud(RegisterStudDto registerStudDto)
        {
            if (await UserExists(registerStudDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerStudDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerStudDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerStudDto.Password));
            user.PasswordSalt = hmac.Key;
            user.AppUserType = "ColStudent";
            // user.RegisterCode = registerStudDto.RegisterCode;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var studInfo = new StudInfo
            {
                AppUserId = user.AppUserId
            };

            _context.StudInfos.Add(studInfo);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "ColStudent",
                FirstName = user.FirstName,
                LastName = user.LastName,
                Major = user.Major,
                Category = user.Category,
                ClassYear = user.ClassYear,
                CoLocation = user.CoLocation,
                StLocation = user.StLocation,
                CiLocation = user.CiLocation,
                RegisterCode = user.RegisterCode,
                IcfNote = user.IcfNote
            };
        }

        [HttpPost("RegisterEmp")]
        public async Task<ActionResult<UserDto>> RegisterEmp(RegisterEmpDto registerEmpDto)
        {
            if (await UserExists(registerEmpDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerEmpDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerEmpDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerEmpDto.Password));
            user.PasswordSalt = hmac.Key;
            user.AppUserType = "EmpHr";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var empInfo = new EmpInfo
            {
                AppUserId = user.AppUserId
            };

            _context.EmpInfos.Add(empInfo);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "EmpHr",
                FirstName = user.FirstName,
                LastName = user.LastName,
                HrContactTitle = user.HrContactTitle,
                EmpName = user.EmpName,
                CiempLocation = user.CiempLocation,
                StempLocation = user.StempLocation,
                RegisterCode = user.RegisterCode,
                IcfNote = user.IcfNote
            };
        }

        [HttpPost("RegisterCollegeAdmin")]
        public async Task<ActionResult<UserDto>> RegisterCollegeAdmin(RegisterCollegeAdminDto registerCollegeAdminDto)
        {
            if (await UserExists(registerCollegeAdminDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerCollegeAdminDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerCollegeAdminDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerCollegeAdminDto.Password));
            user.PasswordSalt = hmac.Key;
            user.AppUserType = "CollegeAdmin";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "CollegeAdmin",
                FirstName = user.FirstName,
                LastName = user.LastName,
                HrContactTitle = user.HrContactTitle,
                College = user.College,
                RegisterCode = user.RegisterCode
            };
        }

        [HttpPost("RegisterPortalAdmin")]
        public async Task<ActionResult<UserDto>> RegisterPortalAdmin(RegisterPortalAdminDto registerPortalAdminDto)
        {
            if (await UserExists(registerPortalAdminDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerPortalAdminDto);

            using var hmac = new HMACSHA512();

            user.UserName = registerPortalAdminDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerPortalAdminDto.Password));
            user.PasswordSalt = hmac.Key;
            user.AppUserType = "PortalAdmin";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                AppUserId = user.AppUserId,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                AppUserType = "PortalAdmin",
                FirstName = user.FirstName,
                LastName = user.LastName,
                HrContactTitle = user.HrContactTitle,
                RegisterCode = user.RegisterCode
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
                Major = user.Major,
                Category = user.Category,
                College = user.College,
                HrContactTitle = user.HrContactTitle,
                ClassYear = user.ClassYear,
                CoLocation = user.CoLocation,
                StLocation = user.StLocation,
                CiLocation = user.CiLocation,
                IcfNote = user.IcfNote,
                CiempLocation = user.CiempLocation,
                StempLocation = user.StempLocation,
                StudentUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.StudentUrl,
                LogoUrl = user.Photos.FirstOrDefault(x => x.IsMainLogo)?.LogoUrl,
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}