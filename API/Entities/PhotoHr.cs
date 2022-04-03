using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PhotoHr
    {
        public int Id { get; set; }
        public string HrUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainHr { get; set; } = false;
        public string PublicId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

    }
}