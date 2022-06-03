using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddStempLocationDto
    {
        public int StempLocationId { get; set; }
        public string StempLocationName { get; set; }
        public string StempLocationSortName { get; set; }
    }
}