using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AcBullet
    {
        [Key]
        public int AcBulletId { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string AcBulletText { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
        public int StudInfoId { get; set; }
        public StudInfo StudInfo { get; set; }
    }
}