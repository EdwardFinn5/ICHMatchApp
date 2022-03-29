using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddDutyBulletDto
    {
        public int DutyBulletId { get; set; }
        public string DutyBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; }
        public int PositionId { get; set; }
        // public int AppUserId { get; set; }
    }
}