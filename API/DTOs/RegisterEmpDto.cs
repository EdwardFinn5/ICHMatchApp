using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterEmpDto
    {
        public int AppUserId { get; set; }
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 4)]
        public string Password { get; set; }
        [Required]
        public string RegisterCode { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string HrContactTitle { get; set; }
        [Required] public string CiempLocation { get; set; }
        [Required] public string StempLocation { get; set; }
        [Required] public string EmpName { get; set; }
        [Required] public string EmpIndustry { get; set; }
        [Required] public string EmployeeNum { get; set; }
    }
}