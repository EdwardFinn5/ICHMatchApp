using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CoLocation
    {
        [Key]
        public int CoLocationId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string CoLocationName { get; set; }
        public string CoLocationSortName { get; set; }
        public ICollection<StLocation> StLocations { get; set; }
        // public ICollection<OtherCC> OtherCCs { get; set; }
    }
}