using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CiLocation
    {
        [Key]
        public int CiLocationId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string CiLocationName { get; set; }
        public virtual StLocation stLocation { get; set; }
        public int StLocationId { get; set; }

    }
}