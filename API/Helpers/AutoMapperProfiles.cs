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
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainHr).HrUrl))
            .ForMember(dest => dest.GPA, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).GPA))
            // .ForMember(dest => dest.GradDate, opt => opt
            // .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).GradDate))
            .ForMember(dest => dest.BestEmail, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).BestEmail))
            .ForMember(dest => dest.BestPhone, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).BestPhone))
            .ForMember(dest => dest.Athletics, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).Athletics))
            .ForMember(dest => dest.Arts, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).Arts))
            .ForMember(dest => dest.ExtraCurricular, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).ExtraCurricular))
            .ForMember(dest => dest.AcadmicPlus, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).AcademicPlus))
            .ForMember(dest => dest.WorkPlus, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).WorkPlus))
            .ForMember(dest => dest.DreamJob, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).DreamJob));

            CreateMap<AppUser, CardMemberDto>()
            .ForMember(dest => dest.StudentUrl, opt => opt
                .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
            .ForMember(dest => dest.LogoUrl, opt => opt
                .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl));

            CreateMap<Photo, PhotoDto>();
            CreateMap<StudInfo, StudInfoDto>();
            CreateMap<EmpInfo, EmpInfoDto>();
            CreateMap<Position, PositionDto>();
        }
    }
}