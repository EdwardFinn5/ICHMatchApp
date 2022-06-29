using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class News
    {
        [Key]
        public int NewsId { get; set; }
        [Column(TypeName = "nvarchar(80)")]
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } = true;
         public ICollection<PhotoNews> PhotoNewes { get; set; }

    }
}