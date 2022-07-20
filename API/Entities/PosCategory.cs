using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PosCategory
    {
        [Key]
        public int PosCategoryId { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string PosCategoryName { get; set; }
        public ICollection<PositName> PositNames { get; set; }
    }
}