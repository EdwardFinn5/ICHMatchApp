using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterEmpDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        // public string Location { get; set; }
        // public string EmpName { get; set; }
        // public string EmpIndustry { get; set; }
        // public string EmployeeNum { get; set; }
    }
}