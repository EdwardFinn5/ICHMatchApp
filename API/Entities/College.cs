using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class College
    {
        [Key]
        public int CollegeId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string CollegeName { get; set; }
    }
}

