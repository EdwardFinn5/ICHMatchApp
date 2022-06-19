using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class DutyBullet
    {
        [Key]
        public int DutyBulletId { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string DutyBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        public int PositionId { get; set; }
        public Position Position { get; set; }

    }
}