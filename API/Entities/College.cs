using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class College
    {
        [Key]
        public int CollegeId { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string CollegeName { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string CollegeNickname { get; set; }
    }
}

