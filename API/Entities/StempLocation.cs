using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class StempLocation
    {
        [Key]
        public int StempLocationId { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public string StempLocationName { get; set; }
        public string StempLocationSortName { get; set; }
        public ICollection<CiempLocation> CiempLocations { get; set; }
    }
}