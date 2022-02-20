using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CardMemberDto
    {
        public int AppUserId { get; set; }
        // public string Username { get; set; } I delete this so that it cannot be accessed with user card
        public string StudentUrl { get; set; }
        public string LogoUrl { get; set; }
        public string HrUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AppUserType { get; set; }
        public bool Active { get; set; } = true;
        public string Location { get; set; }
        public string ClassYear { get; set; }
        public string Major { get; set; }
        public string College { get; set; }
        public string GivingLevel { get; set; }
        public string RegisterCode { get; set; }
        public int GiftAmt { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
        public String EmpWebsite { get; set; }
        public String CompanyDescription { get; set; }
        public String WhyWork { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}