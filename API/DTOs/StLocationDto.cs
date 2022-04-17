using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class StLocationDto
    {
        public int StLocationId { get; set; }
        public string StLocationName { get; set; }
        public int CoLocationId { get; set; }
        public ICollection<CiLocationDto> CiLocations { get; set; }
    }
}