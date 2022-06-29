using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NewsUpdateDto
    {
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; } 
    }
}