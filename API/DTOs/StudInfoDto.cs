using System;

namespace API.DTOs
{
    public class StudInfoDto
    {
        public int StudInfoId { get; set; }
        public string StudInfoName { get; set; }
        public string GPA { get; set; }
        public DateTime GradDate { get; set; }
        public string BestEmail { get; set; }
        public string BestPhone { get; set; }
        public string Athletics { get; set; }
        public string Arts { get; set; }
        public bool IsActive { get; set; }
        public string ExtraCurricular { get; set; }
        public string AcademicPlus { get; set; }
        public string WorkPlus { get; set; }
        public string DreamJob { get; set; }
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
        public int AppUserId { get; set; }
    }
}