using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Position
    {
        [Key]
        public int PositionId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PositionName { get; set; }
        public string PositionDescription { get; set; }
        public string LookingFor { get; set; }

        [Column(TypeName = "varchar(25)")]
        public string PositionType { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string PositionLocation { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime AppDeadline { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public bool Active { get; set; } = true;

        [Column(TypeName = "nvarchar(100)")]
        public string HrContact { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string HrContactTitle { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string HowToApply { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ApplyEmail { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}