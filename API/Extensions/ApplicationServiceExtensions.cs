using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<ICardUserRepository, CardUserRepository>();
            services.AddScoped<IStudInfoRepository, StudInfoRepository>();
            services.AddScoped<IEmpInfoRepository, EmpInfoRepository>();
            services.AddScoped<IPositionRepository, PositionRepository>();
            services.AddScoped<IPosition2Repository, Position2Repository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICollegeRepository, CollegeRepository>();
            services.AddScoped<IEmpIndustryRepository, EmpIndustryRepository>();
            services.AddScoped<IMajorRepository, MajorRepository>();
            services.AddScoped<IRegisterCodeRepository, RegisterCodeRepository>();
            services.AddScoped<ICoLocationRepository, CoLocationRepository>();
            services.AddScoped<IStempLocationRepository, StempLocationRepository>();
            services.AddScoped<IStLocationRepository, StLocationRepository>();
            services.AddScoped<ICiLocationRepository, CiLocationRepository>();
            services.AddScoped<ICiempLocationRepository, CiempLocationRepository>();
            services.AddScoped<IPositNameRepository, PositNameRepository>();
            services.AddScoped<INewsRepository, NewsRepository>();
            services.AddScoped<IProfileAdviceRepository, ProfileAdviceRepository>();
            services.AddScoped<IPosCategoryRepository, PosCategoryRepository>();
            services.AddScoped<IDutyBulletRepository, DutyBulletRepository>();
            services.AddScoped<ISkillsBulletRepository, SkillsBulletRepository>();
            services.AddScoped<IAcBulletRepository, AcBulletRepository>();
            services.AddScoped<IWorkBulletRepository, WorkBulletRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}