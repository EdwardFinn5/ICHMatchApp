using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterCollegeAdminDto
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
    }
}