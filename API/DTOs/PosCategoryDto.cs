using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PosCategoryDto
    {
        public int PosCategoryId { get; set; }
        public string PosCategoryName { get; set; }
        public ICollection<PositNameDto> PositNames { get; set; }
    }
}