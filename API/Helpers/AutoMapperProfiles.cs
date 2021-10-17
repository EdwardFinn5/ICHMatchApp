using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
              .ForMember(dest => dest.StudentUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
                .ForMember(dest => dest.LogoUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl))
                .ForMember(dest => dest.HrUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainHr).HrUrl));
            CreateMap<Photo, PhotoDto>();
            CreateMap<StudInfo, StudInfoDto>();
            CreateMap<EmpInfo, EmpInfoDto>();
            CreateMap<Position, PositionDto>();
        }
    }
}