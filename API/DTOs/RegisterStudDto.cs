using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterStudDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        // public string Location { get; set; }
        // public string ClassYear { get; set; }
        // public string Major { get; set; }
        // public string College { get; set; }
    }
}