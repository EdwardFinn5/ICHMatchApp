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
            services.AddScoped<IMajorRepository, MajorRepository>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IPositNameRepository, PositNameRepository>();
            services.AddScoped<IPosCategoryRepository, PosCategoryRepository>();
            services.AddScoped<IDutyBulletRepository, DutyBulletRepository>();
            services.AddScoped<ISkillsBulletRepository, SkillsBulletRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}