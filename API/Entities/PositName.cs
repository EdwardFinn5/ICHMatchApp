using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PositName
    {
        [Key]
        public int PositNameId { get; set; }

        [Column(TypeName = "varchar(75)")]

        public string PosName { get; set; }

        public virtual PosCategory PosCategory { get; set; }

        public int PosCategoryId { get; set; }
    }
}