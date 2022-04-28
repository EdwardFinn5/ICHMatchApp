using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddCiLocationDto
    {
        public int CiLocationId { get; set; }
        public string CiLocationName { get; set; }
        public string CiLocationSortName { get; set; }
        public int StLocationId { get; set; }
    }
}