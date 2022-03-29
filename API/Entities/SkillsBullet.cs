using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class SkillsBullet
    {
        public int SkillsBulletId { get; set; }
        public string SkillsBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        // public int AppUserId { get; set; }
        // public AppUser AppUser { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        // public ICollection<PositionDutyBullet> PositionDutyBullets { get; set; }
    }
}