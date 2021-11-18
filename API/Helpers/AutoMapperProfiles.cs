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
            .ForMember(dest => dest.GradDate, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).GradDate))
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
            .ForMember(dest => dest.AcademicPlus, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).AcademicPlus))
            .ForMember(dest => dest.WorkPlus, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).WorkPlus))
            .ForMember(dest => dest.DreamJob, opt => opt
                .MapFrom(src => src.StudInfos.FirstOrDefault(x => x.IsActive).DreamJob))
            .ForMember(dest => dest.EmpWebsite, opt => opt
                .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).EmpWebsite))
            .ForMember(dest => dest.CompanyDescription, opt => opt
                .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).CompanyDescription))
            .ForMember(dest => dest.WhyWork, opt => opt
                .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).WhyWork))
            .ForMember(dest => dest.DateAdded, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).DateAdded))
            .ForMember(dest => dest.PositionName, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionName))
            .ForMember(dest => dest.StartDate, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).StartDate))
            .ForMember(dest => dest.PositionDescription, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionDescription))
            .ForMember(dest => dest.LookingFor, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).LookingFor))
            .ForMember(dest => dest.PositionBenefits, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionBenefits))
            .ForMember(dest => dest.PositionType, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionType))
            .ForMember(dest => dest.PositionLocation, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionLocation))
            .ForMember(dest => dest.DateAdded, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).DateAdded))
            .ForMember(dest => dest.AppDeadline, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).AppDeadline))
            .ForMember(dest => dest.HrContact, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).HrContact))
            .ForMember(dest => dest.HrContactTitle, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).HrContactTitle))
            .ForMember(dest => dest.HowToApply, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).HowToApply))
            .ForMember(dest => dest.ApplyEmail, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).ApplyEmail))
            .ForMember(dest => dest.ApplyLink, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).ApplyLink));

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