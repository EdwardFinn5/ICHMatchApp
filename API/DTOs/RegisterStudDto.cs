using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterStudDto
    {

        public int AppUserId { get; set; }

        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 4)]
        public string Password { get; set; }
        [Required] public string RegisterCode { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string ciLocation { get; set; }
        [Required] public string coLocation { get; set; }
        [Required] public string stLocation { get; set; }
        [Required] public string ClassYear { get; set; }
        [Required] public string Major { get; set; }
        [Required] public string Category { get; set; }
        [Required] public string College { get; set; }
    }
}