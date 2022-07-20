using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PhotoHr
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string HrUrl { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainHr { get; set; } = false;
        [Column(TypeName = "varchar(100)")]
        public string PublicId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}