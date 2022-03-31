using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SkillsBulletDto
    {
        public int SkillsBulletId { get; set; }
        public string SkillsBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        public int PositionId { get; set; }
    }
}