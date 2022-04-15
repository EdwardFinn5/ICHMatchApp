using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddPositNameDto
    {
        public int PositNameId { get; set; }
        public string PosName { get; set; }
        public int PosCategoryId { get; set; }
    }
}