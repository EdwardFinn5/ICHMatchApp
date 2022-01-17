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

        [Column(TypeName = "nvarchar(250)")]
        public string PositionIdentifier { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PositionName { get; set; }
        public string PositionDescription { get; set; }
        public string LookingFor { get; set; }
        public string PositionBenefits { get; set; }

        [Column(TypeName = "varchar(25)")]
        public string PositionType { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string PositionLocation { get; set; }
        public Nullable<DateTime> DateAdded { get; set; }
        public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> AppDeadline { get; set; }
        public bool IsActive { get; set; } = true;

        [Column(TypeName = "nvarchar(100)")]
        public string HrContact { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string HrContactTitle { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string HowToApply { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ApplyEmail { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ApplyLink { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}