using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class WorkBulletDto
    {
        public int WorkBulletId { get; set; }
        public string WorkBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; }
        public int StudInfoId { get; set; }
    }
}