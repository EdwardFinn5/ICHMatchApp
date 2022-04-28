using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LikeDto
    {
        public int AppUserId { get; set; } //Id is UserId
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Major { get; set; }
        public string PositName { get; set; }
        public string EmpName { get; set; }
        public string ClassYear { get; set; }
        public string StLocation { get; set; }
        public string CoLocation { get; set; }
        public string CiLocation { get; set; }
        public string College { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
        public string StudentUrl { get; set; }
        public string LogoUrl { get; set; }
        public string AppUserType { get; set; }
    }
}