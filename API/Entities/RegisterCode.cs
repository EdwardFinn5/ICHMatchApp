using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class RegisterCode
    {
        public int RegisterCodeId { get; set; }

        [Column(TypeName = "varchar(40)")]
        public string RegisterCodeName1 { get; set; }
        public string RegisterCodeName2 { get; set; }
        public string RegisterCodeName3 { get; set; }
        public string RegisterCodeName4 { get; set; }
        public string RegisterCodeName5 { get; set; }
        public string RegisterCodeName6 { get; set; }
        public string RegisterCodeName7 { get; set; }
        public string RegisterCodeName8 { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}