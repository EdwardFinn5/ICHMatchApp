using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class SkillsBullet
    {
        [Key]
        public int SkillsBulletId { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string SkillsBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        public int PositionId { get; set; }
        public Position Position { get; set; }
    }
}