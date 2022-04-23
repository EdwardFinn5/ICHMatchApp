using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddStLocationDto
    {
        public int StLocationId { get; set; }
        public string StLocationName { get; set; }
        public string StLocationSortName { get; set; }
        public int CoLocationId { get; set; }
    }
}