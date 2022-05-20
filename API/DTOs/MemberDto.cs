using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int AppUserId { get; set; }
        public string Username { get; set; }
        public string StudentUrl { get; set; }
        public string LogoUrl { get; set; }
        public string HrUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AppUserType { get; set; }
        public bool IsActive { get; set; } = true;
        public string CiLocation { get; set; }
        public string CoLocation { get; set; }
        public string StLocation { get; set; }
        public string ClassYear { get; set; }
        public string Category { get; set; }
        public string PosCategory { get; set; }
        public string PosName { get; set; }
        public string Major { get; set; }
        public string College { get; set; }
        public string RegisterCode { get; set; }
        // public int GiftAmt { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public String GPA { get; set; }
        public DateTime GradDate { get; set; }
        public String BestEmail { get; set; }
        public String BestPhone { get; set; }
        public String Athletics { get; set; }
        public String Arts { get; set; }
        public String ExtraCurricular { get; set; }
        public String AcademicPlus { get; set; }
        public String WorkPlus { get; set; }
        public String DreamJob { get; set; }
        // public String EmpWebsite { get; set; }
        // public String CompanyDescription { get; set; }
        // public String WhyWork { get; set; }
        // public String PositionName { get; set; }
        // public String PositionIdentifier { get; set; }
        // public String PositionDescription { get; set; }
        // public String LookingFor { get; set; }
        // public String PositionBenefits { get; set; }
        // public String PositionType { get; set; }
        public String PositionLocation { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime AppDeadline { get; set; }
        // public String HrContact { get; set; }
        public String HrContactTitle { get; set; }
        public String HowToApply { get; set; }
        public String ApplyEmail { get; set; }
        public String ApplyLink { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<PhotoHrDto> PhotoHrs { get; set; }
        public ICollection<StudInfoDto> StudInfos { get; set; }
        public ICollection<EmpInfoDto> EmpInfos { get; set; }
        public ICollection<PositionDto> Positions { get; set; }
        public ICollection<RegisterCodeDto> RegisterCodes { get; set; }
    }
}