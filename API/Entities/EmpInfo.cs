using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class EmpInfo
    {
        [Key]
        public int EmpInfoId { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string EmpWebsite { get; set; }
        public string CompanyDescription { get; set; }
        public string WhyWork { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}