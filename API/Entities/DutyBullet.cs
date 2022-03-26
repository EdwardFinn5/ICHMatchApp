using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class DutyBullet
    {
        public int DutyBulletId { get; set; }
        public string DutyBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        // public int AppUserId { get; set; }
        // public AppUser AppUser { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        // public ICollection<PositionDutyBullet> PositionDutyBullets { get; set; }

    }
}