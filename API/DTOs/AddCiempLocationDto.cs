using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddCiempLocationDto
    {
        public int CiempLocationId { get; set; }
        public string CiempLocationName { get; set; }
        public string CiempLocationSortName { get; set; }
        public int StempLocationId { get; set; }
    }
}