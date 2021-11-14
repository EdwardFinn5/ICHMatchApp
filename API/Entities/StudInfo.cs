using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class StudInfo
    {
        [Key]
        public int StudInfoId { get; set; }

        [Column(TypeName = "varchar(10)")]
        public string GPA { get; set; }

        public Nullable<DateTime> GradDate { get; set; }

        // public DateTime GradDate { get; set; } = DateTime.Now;

        [Column(TypeName = "nvarchar(255)")]
        public string BestEmail { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string BestPhone { get; set; }

        public string Athletics { get; set; }
        public string Arts { get; set; }
        public bool IsActive { get; set; } = true;
        public string ExtraCurricular { get; set; }
        public string AcademicPlus { get; set; }
        public string WorkPlus { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string DreamJob { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}