using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class StLocation
    {
        [Key]
        public int StLocationId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string StLocationName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string StLocationSortName { get; set; }
        public ICollection<CiLocation> CiLocations { get; set; }
        public virtual CoLocation coLocation { get; set; }
        public int CoLocationId { get; set; }
    }
}