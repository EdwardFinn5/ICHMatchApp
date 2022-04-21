using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CoLocationDto
    {
        public int CoLocationId { get; set; }
        public string CoLocationName { get; set; }
        public string CoLocationDisplayName { get; set; }
        public ICollection<StLocationDto> StLocations { get; set; }
    }
}