namespace API.DTOs
{
    public class EmpInfoDto
    {
        public int EmpInfoId { get; set; }
        public string EmpWebsite { get; set; }
        public string CompanyDescription { get; set; }
        public string WhyWork { get; set; }
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
        public int AppUserId { get; set; }
    }
}