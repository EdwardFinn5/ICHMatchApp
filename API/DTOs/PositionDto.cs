using System;

namespace API.DTOs
{
    public class PositionDto
    {
        public int PositionId { get; set; }
        public string PositionIdentifier { get; set; }
        public string PositionName { get; set; }
        public string PositionDescription { get; set; }
        public string LookingFor { get; set; }
        public string PositionBenefits { get; set; }
        public string PositionType { get; set; }
        public string PositionLocation { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime AppDeadline { get; set; }
        public bool IsActive { get; set; } = true;
        public string HrContact { get; set; }
        public string HrContactTitle { get; set; }
        public string HowToApply { get; set; }
        public string ApplyEmail { get; set; }
        public string ApplyLink { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string GivingLevel { get; set; }
        public int GiftAmt { get; set; }
        public string LogoUrl { get; set; }
        public bool IsMainLogo { get; set; }
        public string CompanyDescription { get; set; }
        public string WhyWork { get; set; }
        public int AppUserId { get; set; }
    }
}