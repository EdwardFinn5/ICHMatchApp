using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class PositionDto
    {
        public int PositionId { get; set; }
        // public string PositionIdentifier { get; set; }
        public string PosName { get; set; }
        public string PosCategory { get; set; }
        public string PositionDescription { get; set; }
        // public string LookingFor { get; set; }
        public string PositionBenefits { get; set; }
        public string PositionType { get; set; }
        public string SalaryRange { get; set; }
        public string CiLocation { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime AppDeadline { get; set; }
        public bool IsActive { get; set; }
        // public string HrContact { get; set; }
        public string HrContactTitle { get; set; }
        public string HowToApply { get; set; }
        public string ApplyEmail { get; set; }
        public string ApplyLink { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
        public string RegisterCode { get; set; }
        public string LogoUrl { get; set; }
        public bool IsMainLogo { get; set; }
        public string CompanyDescription { get; set; }
        public string WhyWork { get; set; }
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
        // public string DutyBulletText { get; set; }
        public int AppUserId { get; set; }
        // public ICollection<DutyBulletDto> DutyBulletDtos { get; set; }
    }
}