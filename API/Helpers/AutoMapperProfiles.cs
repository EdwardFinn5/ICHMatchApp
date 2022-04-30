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

            // CreateMap<Position, PositionDto>()
            //      .ForMember(dest => dest.EmpName, opt => opt
            //         .MapFrom(src => src.Users.FirstOrDefault(x => x.Active).EmpName))

            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.StudentUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
                .ForMember(dest => dest.LogoUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl))
                .ForMember(dest => dest.HrUrl, opt => opt
                    .MapFrom(src => src.PhotoHrs.FirstOrDefault(x => x.IsMainHr).HrUrl))
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
            // .ForMember(dest => dest.EmpWebsite, opt => opt
            //     .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).EmpWebsite))
            // .ForMember(dest => dest.CompanyDescription, opt => opt
            //     .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).CompanyDescription))
            // .ForMember(dest => dest.WhyWork, opt => opt
            //     .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).WhyWork))
            .ForMember(dest => dest.DateAdded, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).DateAdded))
            // .ForMember(dest => dest.PositionName, opt => opt
            //     .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionName))
            .ForMember(dest => dest.StartDate, opt => opt
                .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).StartDate))
            // .ForMember(dest => dest.PositionDescription, opt => opt
            //     .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionDescription))
            // .ForMember(dest => dest.LookingFor, opt => opt
            //     .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).LookingFor))
            // .ForMember(dest => dest.PositionBenefits, opt => opt
            //     .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionBenefits))
            // .ForMember(dest => dest.PositionType, opt => opt
            //     .MapFrom(src => src.Positions.FirstOrDefault(x => x.IsActive).PositionType))
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

            CreateMap<Position, PositionDto>()
               .ForMember(d => d.EmpIndustry, o => o.MapFrom(s => s.AppUser.EmpIndustry))
               .ForMember(d => d.EmpName, o => o.MapFrom(s => s.AppUser.EmpName))
               .ForMember(d => d.RegisterCode, o => o.MapFrom(s => s.AppUser.RegisterCode))
               .ForMember(d => d.EmployeeNum, o => o.MapFrom(s => s.AppUser.EmployeeNum))
               .ForMember(d => d.LogoUrl, o => o.MapFrom(s => s.AppUser.LogoUrl))
               .ForMember(dest => dest.DutyBulletText, opt => opt
                    .MapFrom(src => src.DutyBullets.FirstOrDefault(x => x.IsActive).DutyBulletText));
            // .ForMember(d => d.LogoUrl, o => o.MapFrom(s => s.AppUser.HrUrl))   

            CreateMap<AppUser, CardMemberDto>()
                .ForMember(dest => dest.StudentUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
                .ForMember(dest => dest.LogoUrl, opt => opt
                    .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl))
                .ForMember(dest => dest.HrUrl, opt => opt
                    .MapFrom(src => src.PhotoHrs.FirstOrDefault(x => x.IsMainHr).HrUrl))
                .ForMember(dest => dest.EmpWebsite, opt => opt
                    .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).EmpWebsite))
                .ForMember(dest => dest.CompanyDescription, opt => opt
                    .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).CompanyDescription))
                .ForMember(dest => dest.WhyWork, opt => opt
                    .MapFrom(src => src.EmpInfos.FirstOrDefault(x => x.IsActive).WhyWork));

            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoHr, PhotoHrDto>();
            CreateMap<StudInfo, StudInfoDto>();
            CreateMap<EmpInfo, EmpInfoDto>();



            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<StudInfoUpdateDto, StudInfo>();
            CreateMap<PositionUpdateDto, Position>();
            CreateMap<EmpInfoUpdateDto, EmpInfo>();
            CreateMap<AddStudInfoDto, StudInfo>();
            CreateMap<AddPositNameDto, PositName>();
            CreateMap<StudInfo, AddStudInfoDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryUpdateDto, Category>();
            CreateMap<PositName, PositNameDto>();
            CreateMap<PositNameUpdateDto, PositName>();
            CreateMap<PosCategory, PosCategoryDto>();
            CreateMap<PosCategoryUpdateDto, PosCategory>();
            CreateMap<College, CollegeDto>();
            CreateMap<CollegeUpdateDto, College>();
            CreateMap<MajorUpdateDto, Major>();
            CreateMap<Major, MajorDto>();
            CreateMap<CiLocationUpdateDto, CiLocation>();
            CreateMap<CiLocation, CiLocationDto>();
            CreateMap<StLocationUpdateDto, StLocation>();
            CreateMap<StLocation, StLocationDto>();
            CreateMap<CoLocationUpdateDto, CoLocation>();
            CreateMap<CoLocation, CoLocationDto>();
            CreateMap<DutyBulletUpdateDto, DutyBullet>();
            CreateMap<DutyBullet, DutyBulletDto>();
            CreateMap<SkillsBulletUpdateDto, SkillsBullet>();
            CreateMap<SkillsBullet, SkillsBulletDto>();
            CreateMap<RegisterEmpDto, AppUser>();
            CreateMap<RegisterStudDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.StudentSenderUrl, opt => opt
                    .MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
                .ForMember(dest => dest.CompanySenderUrl, opt => opt
                    .MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl))
                .ForMember(dest => dest.StudentRecipientUrl, opt => opt
                    .MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).StudentUrl))
                .ForMember(dest => dest.CompanyRecipientUrl, opt => opt
                    .MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMainLogo).LogoUrl));
        }
    }
}