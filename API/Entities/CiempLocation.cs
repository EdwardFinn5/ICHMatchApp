using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CiempLocation
    {
        [Key]
        public int CiempLocationId { get; set; }

        [Column(TypeName = "varchar(40)")]
        public string CiempLocationName { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string CiempLocationSortName { get; set; }
        public virtual StempLocation stempLocation { get; set; }
        public int StempLocationId { get; set; }
    }
}