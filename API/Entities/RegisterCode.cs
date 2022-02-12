using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class RegisterCode
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(5)")]
        public string RegisterCodeName { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}