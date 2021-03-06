using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Position
    {
        [Key]
        public int PositionId { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string RegisterCode { get; set; }

        [Column(TypeName = "varchar(75)")]
        public string PosName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PosCategory { get; set; }
        public string PositionDescription { get; set; }
        public string PositionBenefits { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string CiempLocation { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string StempLocation { get; set; }
        [Column(TypeName = "varchar(25)")]
        public string PositionType { get; set; }
        [Column(TypeName = "varchar(75)")]
        public string SalaryRange { get; set; }
        public Nullable<DateTime> DateAdded { get; set; } = DateTime.Now.Date;
        public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> AppDeadline { get; set; }
        public bool IsActive { get; set; } = true;
        public string HowToApply { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string ApplyEmail { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string ApplyLink { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<DutyBullet> DutyBullets { get; set; }
        public ICollection<SkillsBullet> SkillsBullets { get; set; }
        // public ICollection<PhotoLogo> PhotoLogos { get; set; }

    }
}