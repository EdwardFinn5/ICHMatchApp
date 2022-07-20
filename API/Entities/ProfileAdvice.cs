using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProfileAdvice
    {
        [Key]
        public int ProfileAdviceId { get; set; }
        [Column(TypeName = "varchar(75)")]
        public string ProfileAdviceTitle { get; set; }
        public string ProfileAdviceContent { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
    }
}