using System;
using System.Collections.Generic;
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

        [Column(TypeName = "varchar(100)")]
        public string BestEmail { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string BestPhone { get; set; }

        public string Athletics { get; set; }
        public string Arts { get; set; }
        public bool IsActive { get; set; } = true;
        public string ExtraCurricular { get; set; }
        // public string AcademicPlus { get; set; }
        // public string WorkPlus { get; set; }

        [Column(TypeName = "varchar(250)")]
        public string DreamJob { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<AcBullet> AcBullets { get; set; }
        public ICollection<WorkBullet> WorkBullets { get; set; }
    }
}